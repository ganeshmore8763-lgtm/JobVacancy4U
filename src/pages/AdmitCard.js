import "./AdmitCard.css";

function AdmitCard() {
  // Admit Card data
  const admitCards = [
  {
    id: 1,
    organization: "SBI",
    exam_name: "SBI PO",
    admit_card_date: "01 August 2026",
    exam_date: "10 August 2026",
    website: "https://sbi.co.in/web/careers",
  },

  {
    id: 2,
    organization: "RRB",
    exam_name: "RRB NTPC",
    admit_card_date: "Coming Soon",
    exam_date: "Coming Soon",
    website: "https://www.rrbcdg.gov.in/",
  },

  {
    id: 3,
    organization: "ISRO",
    exam_name: "ISRO ICRB",
    admit_card_date: "Available",
    exam_date: "21 September 2026",
    website: "https://www.isro.gov.in/",
  },

  {
    id: 4,
    organization: "IBPS",
    exam_name: "IBPS PO",
    admit_card_date: "Coming Soon",
    exam_date: "Coming Soon",
    website: "https://www.ibps.in/",
  },

  {
    id: 5,
    organization: "UPSC",
    exam_name: "UPSC Civil Services",
    admit_card_date: "Coming Soon",
    exam_date: "Coming Soon",
    website: "https://upsc.gov.in/",
  },

  {
    id: 6,
    organization: "SSC",
    exam_name: "SSC CGL",
    admit_card_date: "Coming Soon",
    exam_date: "Coming Soon",
    website: "https://ssc.gov.in/",
  },

  {
    id: 7,
    organization: "SSC",
    exam_name: "SSC CHSL",
    admit_card_date: "Coming Soon",
    exam_date: "Coming Soon",
    website: "https://ssc.gov.in/",
  },

  {
    id: 8,
    organization: "LIC",
    exam_name: "LIC AAO",
    admit_card_date: "Coming Soon",
    exam_date: "Coming Soon",
    website: "https://licindia.in/careers",
  },

  {
    id: 9,
    organization: "RBI",
    exam_name: "RBI Grade B",
    admit_card_date: "Coming Soon",
    exam_date: "Coming Soon",
    website: "https://www.rbi.org.in/",
  },

  {
    id: 10,
    organization: "NTA",
    exam_name: "UGC NET",
    admit_card_date: "Coming Soon",
    exam_date: "Coming Soon",
    website: "https://ugcnet.nta.ac.in/",
  },

  {
    id: 11,
    organization: "NTA",
    exam_name: "JEE Main",
    admit_card_date: "Coming Soon",
    exam_date: "Coming Soon",
    website: "https://jeemain.nta.nic.in/",
  },

  {
    id: 12,
    organization: "DRDO",
    exam_name: "DRDO Recruitment",
    admit_card_date: "Coming Soon",
    exam_date: "Coming Soon",
    website: "https://www.drdo.gov.in/",
  },

  {
    id: 13,
    organization: "BHEL",
    exam_name: "BHEL Recruitment",
    admit_card_date: "Coming Soon",
    exam_date: "Coming Soon",
    website: "https://www.bhel.com/",
  },

  {
    id: 14,
    organization: "HAL",
    exam_name: "HAL Recruitment",
    admit_card_date: "Coming Soon",
    exam_date: "Coming Soon",
    website: "https://hal-india.co.in/",
  },

  {
    id: 15,
    organization: "GATE",
    exam_name: "GATE",
    admit_card_date: "Coming Soon",
    exam_date: "Coming Soon",
    website: "https://gate2026.iitg.ac.in/",
  },

  {
    id: 16,
    organization: "CISF",
    exam_name: "CISF Recruitment",
    admit_card_date: "Coming Soon",
    exam_date: "Coming Soon",
    website: "https://cisfrectt.cisf.gov.in/",
  },

  {
    id: 17,
    organization: "CRPF",
    exam_name: "CRPF Recruitment",
    admit_card_date: "Coming Soon",
    exam_date: "Coming Soon",
    website: "https://rect.crpf.gov.in/",
  },

  {
    id: 18,
    organization: "Indian Army",
    exam_name: "Army Recruitment",
    admit_card_date: "Coming Soon",
    exam_date: "Coming Soon",
    website: "https://joinindianarmy.nic.in/",
  },

  {
    id: 19,
    organization: "Indian Navy",
    exam_name: "Navy Recruitment",
    admit_card_date: "Coming Soon",
    exam_date: "Coming Soon",
    website: "https://www.joinindiannavy.gov.in/",
  },

  {
    id: 20,
    organization: "Indian Air Force",
    exam_name: "AFCAT",
    admit_card_date: "Coming Soon",
    exam_date: "Coming Soon",
    website: "https://afcat.cdac.in/",
  },

  {
    id: 21,
    organization: "India Post",
    exam_name: "India Post Recruitment",
    admit_card_date: "Coming Soon",
    exam_date: "Coming Soon",
    website: "https://www.indiapost.gov.in/",
  },

  {
    id: 22,
    organization: "EPFO",
    exam_name: "EPFO Recruitment",
    admit_card_date: "Coming Soon",
    exam_date: "Coming Soon",
    website: "https://www.epfindia.gov.in/",
  },

  {
    id: 23,
    organization: "ESIC",
    exam_name: "ESIC Recruitment",
    admit_card_date: "Coming Soon",
    exam_date: "Coming Soon",
    website: "https://www.esic.gov.in/",
  },

  {
    id: 24,
    organization: "LIC",
    exam_name: "LIC Assistant",
    admit_card_date: "Coming Soon",
    exam_date: "Coming Soon",
    website: "https://licindia.in/careers",
  },

  {
    id: 25,
    organization: "NABARD",
    exam_name: "NABARD Grade A",
    admit_card_date: "Coming Soon",
    exam_date: "Coming Soon",
    website: "https://www.nabard.org/",
  },

  {
    id: 26,
    organization: "SEBI",
    exam_name: "SEBI Grade A",
    admit_card_date: "Coming Soon",
    exam_date: "Coming Soon",
    website: "https://www.sebi.gov.in/",
  },

  {
    id: 27,
    organization: "PNB",
    exam_name: "PNB Recruitment",
    admit_card_date: "Coming Soon",
    exam_date: "Coming Soon",
    website: "https://www.pnbindia.in/",
  },

  {
    id: 28,
    organization: "Canara Bank",
    exam_name: "Canara Bank Recruitment",
    admit_card_date: "Coming Soon",
    exam_date: "Coming Soon",
    website: "https://canarabank.com/",
  },

  {
    id: 29,
    organization: "IOCL",
    exam_name: "IOCL Recruitment",
    admit_card_date: "Coming Soon",
    exam_date: "Coming Soon",
    website: "https://iocl.com/",
  },

  {
    id: 30,
    organization: "ONGC",
    exam_name: "ONGC Recruitment",
    admit_card_date: "Coming Soon",
    exam_date: "Coming Soon",
    website: "https://ongcindia.com/",
  },
];

  return (
    <main className="admit-card-page">

      {/* Page Header */}

      <section className="admit-card-header">

        <h1>Admit Card</h1>

        <p>
          Check and download admit cards for
          various government and competitive exams.
        </p>

      </section>


      {/* Admit Card Table */}

      <section className="admit-card-section">

        <div className="section-title">
          <h2>Latest Admit Cards</h2>

          <span>
            {admitCards.length} Exams
          </span>
        </div>


        <div className="admit-table-container">

          <table className="admit-card-table">

            <thead>

              <tr>

                <th>Sr. No.</th>

                <th>Organization</th>

                <th>Exam Name</th>

                <th>Admit Card</th>

                <th>Exam Date</th>

                <th>Official Website</th>

              </tr>

            </thead>


            <tbody>

              {admitCards.map((card) => (

                <tr key={card.id}>

                  <td>
                    {card.id}
                  </td>


                  <td>

                    <strong>
                      {card.organization}
                    </strong>

                  </td>


                  <td>
                    {card.exam_name}
                  </td>


                  <td>

                    <span
                      className={
                        card.admit_card_date ===
                        "Coming Soon"
                          ? "coming-soon"
                          : "available"
                      }
                    >

                      {card.admit_card_date}

                    </span>

                  </td>


                  <td>
                    {card.exam_date}
                  </td>


                  <td>

                    <a
                      href={card.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="admit-button"
                    >
                      Visit Website
                    </a>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>


      {/* Important Notice */}

      <section className="admit-notice">

        <h2>Important Notice</h2>

        <p>
          Always download your admit card from
          the official organization website.
          Check your registration number,
          examination date, reporting time and
          examination centre carefully.
        </p>

      </section>

    </main>
  );
}

export default AdmitCard;