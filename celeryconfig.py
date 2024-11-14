from celery import Celery
from celery.schedules import crontab
from app import app


def make_celery(app):
    celery = Celery(
        app.import_name,
        backend=app.config['CELERY_RESULT_BACKEND'],
        broker=app.config['CELERY_BROKER_URL']
    )
    celery.conf.update(app.config)

    TaskBase = celery.Task

    class ContextTask(TaskBase):
        abstract = True

        def __call__(self, *args, **kwargs):
            with app.app_context():
                return TaskBase.__call__(self, *args, **kwargs)

    celery.Task = ContextTask
    return celery


celery = make_celery(app)


@celery.task
def scrape_task():
    from scrapper import scrape_job_offers  # Avoid circular imports
    url = "https://www.emploi.ci/recherche-jobs-cote-ivoire/data"
    jobs_data = scrape_job_offers(url)

    conn = get_db_connection()
    cursor = conn.cursor()
    for job_data in jobs_data:
        cursor.execute('''INSERT INTO job_offers (title, company, description, date, location, skills) 
                          VALUES (%s, %s, %s, %s, %s, %s)''',
                       (job_data['title'], job_data['company'], job_data['description'], job_data['date'],
                        job_data['location'], ','.join(job_data['skills'])))
    conn.commit()
    conn.close()


celery.conf.beat_schedule = {
    'scrape-every-30-minutes': {
        'task': 'celery_worker.scrape_task',
        'schedule': crontab(minute='*/30'),
    },
}
