import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException


def scrape_job_offers(url):
    # Initialiser les options de Chrome
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--remote-debugging-port=9222')

    # Initialiser le navigateur Chrome avec les options
    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=chrome_options)

    try:
        # Ouvrir la page URL
        driver.get(url)

        # Attendre le chargement complet de la page
        wait = WebDriverWait(driver, 20)
        wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'div.card.card-job')))

        # Extraire les informations des offres d'emploi
        jobs_data = []

        job_listings = driver.find_elements(By.CSS_SELECTOR, 'div.card.card-job')
        for job in job_listings:
            try:
                title_element = job.find_element(By.CSS_SELECTOR, 'div.card-job-detail h3 a')
                company_element = job.find_element(By.CSS_SELECTOR, 'a.card-job-company.company-name')
                description_element = job.find_element(By.CSS_SELECTOR, 'div.card-job-description p')
                date_element = job.find_element(By.CSS_SELECTOR, 'time')
                location_element = job.find_element(By.CSS_SELECTOR, 'ul li:nth-child(4) strong')
                skills_element = job.find_element(By.CSS_SELECTOR, 'ul li:last-child strong')

                title = title_element.text
                company = company_element.text
                description = description_element.text
                date = date_element.get_attribute('datetime')
                location = location_element.text
                skills = skills_element.text.split(' - ')

                job_details = {
                    "title": title,
                    "company": company,
                    "description": description,
                    "date": date,
                    "location": location,
                    "skills": skills
                }

                jobs_data.append(job_details)
            except NoSuchElementException:
                continue

        # Créer un DataFrame pandas
        df = pd.DataFrame(jobs_data)

        # Sauvegarder le DataFrame dans un fichier CSV
        df.to_csv('job_offers.csv', index=False)

        # Afficher le DataFrame (optionnel)
        print(df)

        return jobs_data

    except TimeoutException:
        print("Le chargement des offres d'emploi a pris trop de temps.")
        return []
    finally:
        # Fermer le navigateur
        driver.quit()


# Exemple d'utilisation de la fonction scrape_job_offers
if __name__ == "__main__":
    url = "https://www.emploi.ci/recherche-jobs-cote-ivoire/data"
    scrape_job_offers(url)
