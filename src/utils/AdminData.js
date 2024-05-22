import { images } from "../../next.config";

const AdminData = [
  {
    name: "Dashboard",
    details: [
      {
        question: "What benefits does the Dashboard offers?",
        images: "/assets/images/dashboard.png",
        answer:
          "Admin  gain insights into critical statistics such as the total number of hospitals, operation theaters, surgeons, and completed surgeries etc. These insights empower them to make informed decisions and efficiently manage the platform.",
      },
      {
        question: "What functionalities are available in the Admin Dashboard?",
        points: [
          "Visual representation of completed surgery through chart.",
          "Detailed breakdowns of  s such as hospital count, operation theaters, surgeon count, and completed surgeries.",
          "Selection options to view revenue statistics by year and month.",
          "Ability to add a hospital by clicking the 'Add Hospital' option at the top.",
          "Navigation to view single hospital data by clicking the 'Select Hospital' button in the header.",
        ],
      },
      {
        question:
          "What are the dashboard cards, and how do they contribute to the Dashboard?",
        images: "/assets/images/metric.png",
        answer:
          "The dashboard cards are visual sections that display key performance  s such as the total number of hospitals, surgeons, completed surgeries, and other relevant data points. These cards provide a snapshot of essential information for    admin to assess the platform's performance at a glance.",
      },
      {
        question: "Do the dashboard cards provide real-time data updates?",
        answer:
          "Yes, the   cards reflect real-time data updates, ensuring that  admin have access to the most current information available. As data sources are updated or new information becomes available, the values displayed on the   cards are automatically refreshed to reflect these changes.",
      },

      {
        question:
          "How do admin interpret the percentage change displayed on the dashboard cards?",
        answer:
          "The percentage change indicates the relative difference between the current value of the   and its value in a previous period (e.g., last month). A positive percentage indicates an increase in the value , while a negative percentage indicates a decrease. This allows    admin to gauge trends and monitor changes over time.",
      },
      {
        question:
          "What is the Completed Surgery Chart section in the Dashboard?",
        images: "/assets/images/completedsurgery.png",
        answer:
          "The Completed Surgery Chart is a visual representation of completed surgeries over time within the Dashboard. It provides valuable insights into the trend of completed surgeries, aiding  admin in monitoring performance and identifying patterns.",
      },

      {
        question:
          "Why is it important to visualize completed surgeries over time in the dashboard?",
        answer:
          "Visualizing completed surgeries over time helps admin track the historical trend of surgical activity. By observing fluctuations and patterns in completed surgeries, admin can assess the effectiveness of surgical services, detect anomalies, and make informed decisions to optimize resource allocation and operational efficiency.",
      },

      {
        question:
          "What is the Revenue Statistics section, and how does it contribute to the Dashboard?",
        images: "/assets/images/revenue.png",
        answer:
          "The Revenue Statistics section provides insights into revenue generated within the platform. It offers a snapshot of both total revenue generated and monthly revenue trends, empowering  admin to monitor financial performance and make data-driven decisions.",
      },
      {
        question:
          "What information does the Revenue Statistics section present to  admin?",
        points: [
          "Total Revenue Generated: Displays the total revenue generated for the selected year, giving admin an overview of overall financial performance.",
          "Monthly Revenue Generated: Highlights the revenue generated for the selected month, allowing admin to analyze revenue trends and identify any fluctuations or patterns.",
        ],
      },

      {
        question:
          "What is the purpose of the Select Hospital in the Dashboard?",
        images: "/assets/images/select.png",
        answer:
          "By Clicking the select Hospital will open the dropdown  which will allows users to filter and view real-time data specifically for a selected hospital within the Dashboard.",
      },
      {
        question:
          "Can admin easily switch back to viewing data for all hospitals?",
        answer:
          "Yes, the dropdown typically includes an option (select Hospital) to revert to viewing data aggregated from all hospitals. This enables admin to compare performance across multiple hospitals.",
      },
      {
        question:
          "What changes occur in the Admin Dashboard when a hospital is selected from the dropdown?",
        answer:
          "When a hospital is selected from the dropdown, the Admin Dashboard dynamically updates to display hospital-specific data. This includes metrics such as the total number of operation theaters, surgeons, and completed surgeries, along with a graph illustrating the completed surgeries over time.",
      },
      {
        question:
          "What hospital-specific are showcased in the updated dashboard view?",
        images: "/assets/images/specific.png",
        points: [
          "Total number of operation theaters.",
          "Total number of surgeons.",
          "Total completed surgeries.",
          "A graph depicting the completed surgeries over time provides a visual representation of the hospital's performance.",
        ],
      },

      {
        question:
          "Why is it beneficial for admin to have access to hospital-specific data?",
        answer:
          "Hospital-specific data enables admin to gain deeper insights into the performance and operations of individual hospitals within the platform. By focusing on metrics tailored to each hospital,  admin can identify areas for improvement, allocate resources effectively, and provide targeted support as needed.",
      },
    ],
  },
  {
    name: "Add Hospital",
    details: [
      {
        question: "What's the purpose of the 'Add Hospital' feature",
        images: "/assets/images/addhospital.png",
        answer:
          "When you click 'Add Hospital', you initiate the process of adding a new hospital to the system. This allows you to expand the network of hospitals within your platform.",
      },

      {
        question: "How does adding a hospital benefit ?",
        answer:
          "Adding hospitals increases the reach and availability of healthcare services within your platform. It enables you to onboard new healthcare providers, enhancing the overall user experience for patients and other stakeholders.",
      },

      {
        question:
          "What information do I need to provide when adding a hospital?",
        images: "/assets/images/hospitalprofile.png",
        answer:
          "You'll need to fill in details such as the hospital's name, contact number, location (state, city, address, zip code), and optionally, upload a logo for visual identification.",
      },

      {
        question:
          "Can I create profiles for hospitals and administrators separately?",
        images: "/assets/images/adminprofile.png",
        answer:
          "Yes, you have the flexibility to switch between creating profiles for hospitals and administrators. Simply toggle between 'Admin Profile' and 'Hospital Profile' to switch contexts based on your current task.",
      },

      {
        question: "What happens after I add a new hospital?",
        answer:
          "Once you've filled in the required information and saved the changes, the newly added hospital will become part of your platform's network. Patients and users will be able to access its services through your platform.",
      },
      {
        question: "Is there a limit to the number of hospitals I can add?",
        answer:
          "No, there's no limit to the number of hospitals you can add. You can continue to expand your network by adding as many hospitals as needed to meet the demands of your platform's users.",
      },

      {
        question: "How long does it take to add a new hospital?",
        answer:
          "The time it takes to add a new hospital depends on the completeness of the information provided and any validation processes involved. Typically, the process is quick and straightforward, allowing you to add hospitals efficiently.",
      },
    ],
  },
  {
    name: "Billing",
    details: [
      {
        question: "What's the purpose of the 'Billings' feature?",
        images: "/assets/images/billing.png",
        answer:
          "The 'Billings' feature provides an overview of financial transactions and invoices associated with hospitals within your platform. It helps you manage revenue streams and monitor financial activities.",
      },
      {
        question: "How does viewing billings benefit",
        answer:
          "Viewing billings allows you to track the financial health of hospitals within your platform. It provides insights into revenue generation, payment statuses, and overall financial performance.",
      },
      {
        question: "What information can I see in the billings section?",
        images: "/assets/images/billing.png",
        answer:
          "In the billings section, you can view details such as the hospital name, invoice number, billing month and year, number of OTs (Operating Theatres), billing status, and the billed amount for each transaction.",
      },
      {
        question: "Can I search for specific billings?",
        images: "/assets/images/billingsearch.png",
        answer:
          "Yes, you can search for specific billings by hospital name using the search bar provided. This enables you to quickly locate and review billing information for a particular hospital.",
      },
      {
        question: "How do I filter billings by month and year?",
        images: "/assets/images/billingfilter.png",
        answer:
          "You can filter billings by selecting a specific month and year from the dropdown menus provided. This allows you to focus on billings within a specific timeframe for better analysis.",
      },
      {
        question:
          "Is there a way to download billing data for further analysis?",
        images: "/assets/images/billingdownload.png",
        answer:
          "Yes, you can download billing data in CSV format for further analysis or reporting purposes. Simply click the 'Download CSV' button to export the billing data to your device.",
      },
      {
        question: "What does the 'Total Revenue' represent?",
        images: "/assets/images/billingrevenue.png",
        answer:
          "The 'Total Revenue' displayed at the top represents the sum total of all billed amounts across the filtered billing data. It gives you a quick overview of the total revenue generated within the selected timeframe.",
      },
      {
        question: "Can I view billing details for a specific hospital?",
        answer:
          "Yes, you can view billing details for a specific hospital by searching for its name or selecting it from the list of available hospitals. This allows you to focus on the billing information relevant to a particular hospital.",
      },
    ],
  },
  {
    name: "Hospitals",
    details: [
      {
        question: "What is the Hospitals section for?",
        images: "/assets/images/hospitals.png",
        answer:
          "The Hospitals  section provides a centralized view of all hospitals registered in the system. As a admin, you can easily manage and access information about different hospitals from this interface.",
      },
      {
        question: "How does the search functionality help me as a admin?",
        images: "/assets/images/hospitalssearch.png",
        answer:
          "The search bar allows you to quickly find specific hospitals by their name. This is helpful when you have a large number of hospitals registered and need to locate a particular one efficiently.",
      },
      {
        question: "What information can I see for each hospital?",
        images: "/assets/images/hospitals.png",
        answer:
          "For each hospital, you can see details such as its name, address, contact number, and the name and contact details of the admin associated with that hospital.",
      },
      {
        question:
          "Can I view more detailed information about a specific hospital?",
        images: "/assets/images/hospitalview.png",
        answer:
          "Yes, you can! By clicking on the 'View' button for any hospital, you can access additional details like the hospital's full address, admin's email, and contact number.",
      },
      {
        question:
          "What happens when I click on 'View' inside the single hospital action perform",
        images: "/assets/images/singlehospital.png",
        answer:
          "Clicking on 'View' redirects you to a dedicated page showcasing comprehensive details about the selected hospital.",
      },
      {
        question:
          "What information can I expect to find on the specific hospital detail page?",
        images: "/assets/images/singlehospital.png",
        answer:
          "The specific hospital detail page offers in-depth insights into the hospital, including its name, address, contact details, administrative information, and possibly additional services provided.",
      },
    ],
    subcategories: [
      {
        name: "Hospital Profile",
        details: [
          {
            question:
              "What is the purpose of the Hospital Detail section in our system?",
            images: "/assets/images/singlehospital.png",
            answer:
              "The Hospital Detail section serves as a centralized dashboard where you, as a admin, can view and manage detailed information about a specific hospital. This includes information on completed surgeries, available surgeons, operation theaters, and administrative details, helping you oversee operations effectively.",
          },
          {
            question:
              "What actions can I perform from the Hospital Detail page?",
            answer:
              "From the Hospital Detail page, you can perform several critical actions:",
            images: "/assets/images/singlehospital.png",
            points: [
              "Edit Hospital Details: Update contact information, address, or administrative details by clicking the 'Edit' button.",
              "Delete a Hospital: Remove a hospital from the system by using the 'Delete' button. This action brings up a confirmation modal to prevent accidental deletions.",
              "View Details on Completed Surgeries: By selecting a specific tab, you can view detailed records of all surgeries completed at the hospital.",
              "Manage Surgeons: Access and review the list of surgeons working at the hospital.",
              "Review Operation Theaters: Check details and statuses of the operation theaters available at the hospital.",
            ],
          },
          {
            question:
              "What information is displayed in the Hospital Information section?",
            answer: "The Hospital Information section displays:",
            images: "/assets/images/hospitalinfo.png",
            points: [
              "The name of the hospital.",
              "The hospital's contact number.",
              "The hospital's physical address including city and state.",
            ],
          },
          {
            question: "How can I view details of a completed surgery?",
            answer:
              "You can view detailed information about any completed surgery by clicking on the respective entry in the Completed Surgeries tab. This action opens a drawer on the side, providing detailed information about the surgery, such as date, surgeon involved, and surgery type.",
            images: "/assets/images/completedhospital.png",
          },

          {
            question:
              "What is the purpose of the Complete Surgery Table  section?",
            images: "/assets/images/completedhospital.png",
            answer:
              "The Complete Surgery Table  section displays a table containing information about completed surgeries, including details such as surgery name, surgeon assigned, operation theaters, date, and time of surgery.",
          },
          {
            question: "How can I search for a specific surgery?",
            images: "/assets/images/searchcomplete.png",
            answer:
              "You can search for a specific surgery by typing keywords into the search box provided above the table. This allows you to quickly locate surgeries based on their names.",
          },
          {
            question: "What does the date range picker do?",
            images: "/assets/images/datecomplete.png",
            answer:
              "The date range picker allows you to filter surgeries based on a specific date range. By selecting a start and end date, you can view surgeries that occurred within that time frame.",
          },
          {
            question: "Can I filter surgeries by operation theater?",
            images: "/assets/images/otpcomplete.png",
            answer:
              "Yes, you can filter surgeries by operation theater using the dropdown menu provided. This allows you to view surgeries that took place in a specific operation theater.",
          },
          {
            question: "What is the Surgeon Table  section used for?",
            images: "/assets/images/tab.png",
            answer:
              "The Surgeon Table  section displays a table containing information about surgeons, including their names, email addresses, license numbers, and phone numbers.",
          },
          {
            question: "How can I search for a specific surgeon?",
            images: "/assets/images/searchsurgeon.png",
            answer:
              "You can search for a specific surgeon by typing keywords into the search box provided above the table. This allows you to quickly locate surgeons based on their names, email addresses, license numbers, or phone numbers.",
          },
          {
            question: "What is the Operation Theater Table  section used for?",
            images: "/assets/images/otptab.png",
            answer:
              "The Operation Theater Table  section displays a table containing information about operation theaters, including their names, cameras assigned, and cameras' IP addresses.",
          },
          {
            question: "How can I search for a specific operation theater?",
            images: "/assets/images/otpsearch.png",
            answer:
              "You can search for a specific operation theater by typing keywords into the search box provided above the table. This allows you to quickly locate operation theaters based on their names.",
          },
          {
            question:
              "Can I view and manage the hospital's surgeons and operation theaters?",
            images: "/assets/images/tab.png",
            answer:
              "Yes, the  section includes tabs for managing both the surgeons and the operation theaters:",

            points: [
              "Surgeons Tab: Shows a list of all surgeons at the hospital, allowing you to view and possibly edit their details.",
              "Operation Theaters Tab: Provides a list of all operation theaters, their status, and other relevant details.",
            ],
          },
          {
            question: "What happens when I decide to delete a hospital?",
            answer:
              "When you click 'Delete,' a modal window will appear asking for confirmation to proceed with the deletion. This is to ensure that the action is not taken lightly, as deleting a hospital cannot be undone. The modal provides the hospital name and a warning that this action is irreversible.",
            images: "/assets/images/deletehospital.png",
          },
          {
            question:
              "How can I contact a hospital administrator directly from this section?",
            images: "/assets/images/adminhospital.png",
            answer:
              "The section displays the hospital administrator's contact information, including name, mobile number, and email, under the 'Hospital Admin' section. You can use these details to contact the admin directly.",
          },
          {
            question: "How does the Edit functionality work?",
            images: "/assets/images/edithospital.png",
            answer:
              "When you click the 'Edit' button, you will be redirected to a form where you can update the hospital's details. This may include the name, contact information, address, and administrative data. It's an essential feature for keeping hospital records up-to-date and ensuring that all information displayed is accurate and current.",
          },
          {
            question: "What is the Completed Surgery Drawer? How do I use it?",
            images: "/assets/images/drawerhospital.png",
            answer:
              "The Completed Surgery Drawer is a feature that provides detailed information about a specific surgery when selected. It slides out from the side of the screen, offering details such as the surgery date, the type of surgery, and the surgeon who performed it. You can access this drawer by clicking on an entry in the Completed Surgeries tab, which is particularly useful for reviewing past operations and ensuring compliance with healthcare standards.",
          },
          {
            question:
              "What happens when I click on the 'View' button in the CompletedSurgeryDrawer modal?",
            images: "/assets/images/navigate.png",
            answer:
              "Clicking on the 'View' button in the CompletedSurgeryDrawer modal directs you to the analysis report page. This page provides detailed insights and statistics about the completed surgery, offering valuable information to help you understand the surgical outcomes effectively.",
          },
          {
            question:
              "Can I add new surgeons or operation theaters from this section?",
            answer:
              "The current design of the section focuses on displaying existing data rather than adding new entries directly. To add new surgeons or operation theaters, you would typically navigate to specific sections of the administrative dashboard designed for adding new resources or personnel.",
          },
          {
            question: "What should I do if the delete action fails?",
            answer:
              "If the delete action fails, it could be due to a network issue or a server error. First, check your internet connection and try again. If the problem persists, report the issue to the technical support team, providing them with details of the error message (if any) and the time it occurred. They will investigate the issue to resolve it as quickly as possible.",
          },
          {
            question: "What does the 'Edit Profile' form do?",
            images: "/assets/images/edithospital.png",
            answer:
              "The 'Edit Profile' form allows users to update administrative or hospital profiles. Users can select between two profiles to edit: an admin profile and a hospital profile. Each profile has distinct fields that can be updated, such as name, contact number, address, logo, and more.",
          },
          {
            question: "What actions can I perform on an admin profile?",
            images: "/assets/images/edithospital.png",
            answer:
              "You can update details such as first name, last name, phone number, and email address of an admin. Simply input the new information and click 'Save Changes' to update.",
          },
          {
            question: "What actions can I perform on a hospital profile?",
            images: "/assets/images/profilehospital.png",
            answer:
              "For hospital profiles, you can update the hospital's name, contact number, address, state, city, and upload a new logo if needed. After making changes, click 'Save Changes' to update the profile.",
          },
          {
            question: "Why is it important to keep the admin profile updated?",
            answer:
              "Keeping the admin profile updated ensures that the correct contact information is available for administrative purposes. This facilitates communication and ensures smooth operation of the system.",
          },
          {
            question:
              "Can I upload a new profile picture for the admin account?",
            answer:
              "Currently, the system does not support uploading a new profile picture for the admin account. However, you can update other details such as the name, phone number, and email address.",
          },
          {
            question:
              "Is there a limit to the number of times I can edit the admin profile?",
            answer:
              "There is no specific limit to the number of times you can edit the admin profile. You can make changes as needed to ensure that the information remains accurate and reflects any updates or changes in the admin's details.",
          },
        ],
        subcategories: [
          {
            name: "Analytics Reports",
            details: [
              {
                question:
                  "What information does the Analytics Reports page provide?",
                images: "/assets/images/report.jpg",
                answer:
                  "The Analytics Reports page offers detailed analytics reports related to a specific surgery. It includes information such as hospital details, surgery start and end times, previous notes, and options to share the surgery report or download it as a PDF.",
              },
              {
                question: "How can I access the Analytics Reports page?",
                answer:
                  "You can access the Analytics Reports page by clicking on the 'View' button within the Analytics Reports Drawer. This action opens the page, allowing you to view comprehensive analytics reports and details associated with the selected surgery.",
              },
              {
                question:
                  "What actions are available on the Analytics Reports page?",
                answer:
                  "On the Analytics Reports page, you can perform actions such as sharing the surgery report or downloading it as a PDF. Additionally, you have the option to add new notes related to the surgery for reference.",
              },
              {
                question:
                  "What hospital information is displayed on the Analytics Reports page?",
                answer:
                  "The Analytics Reports page displays various hospital details related to the surgery, including the hospital name, operation theater room, and start and end times of the surgery. These details provide context and insight into the surgical procedure.",
              },
              {
                question:
                  "How can I view previous notes associated with the surgery on the Analytics Reports page?",
                answer:
                  "Previous notes related to the surgery are displayed on the Analytics Reports page. You can view these notes by scrolling through the section titled 'Previous Notes,' which lists comments made by users along with the timestamp of each comment.",
              },
              {
                question:
                  "How do I share the surgery report from the Surgery Detail page?",
                answer:
                  "To share the surgery report from the Surgery Detail page, click on the 'Share' button located at the top right corner of the page. This action opens the Surgery Share Modal, allowing you to share the report with relevant stakeholders or colleagues.",
              },
              {
                question:
                  "What are the allowed video formats for uploading on the Surgery Detail page?",
                answer:
                  "You can upload videos in the following formats on the Surgery Detail page: .mp4, .mov, .webm. These formats are supported for video analysis and viewing purposes.",
              },
              {
                question:
                  "What is the maximum allowed size for uploading videos on the Surgery Detail page?",
                answer:
                  "The maximum allowed size for uploading videos on the Surgery Detail page is 200MB. Ensure that the size of the video file does not exceed this limit to successfully upload the video for analysis.",
              },
              {
                question:
                  "Is there a restriction on the maximum length of videos that can be uploaded on the Surgery Detail page?",
                answer:
                  "Yes, there is a restriction on the maximum length of videos that can be uploaded on the Surgery Detail page. Videos with a maximum length of 5 minutes are allowed for upload. Ensure that the duration of the video does not exceed this limit.",
              },
              {
                question:
                  "Can I upload videos longer than 5 minutes on the Surgery Detail page?",
                answer:
                  "No, the Surgery Detail page restricts the upload of videos longer than 5 minutes. Ensure that the duration of the video you intend to upload does not exceed this limit to comply with the upload requirements.",
              },
              {
                question:
                  "What is the significance of Upper Body Confidence Stats Table in surgical medicine?",
                images: "/assets/images/table.jpg",
                answer:
                  "The Upper Body Confidence Stats Table provides surgeons with key statistical metrics to understand patient capabilities, mitigate risks, and plan precise surgical interventions. It aids in setting realistic expectations, monitoring postoperative progress, and contributes to ongoing research and education in the field of surgical medicine.",
              },

              {
                question:
                  "How do Radar Charts contribute to patient care and recovery processes?",
                images: "/assets/images/radar.jpg",
                answer:
                  "Radar Charts track distance covered and assess mobility, enabling precise monitoring of individual performance. This information aids in tailoring rehabilitation plans and optimizing surgical interventions for improved patient outcomes. Ultimately, the dashboard empowers surgeons with valuable insights to enhance patient care and recovery processes.",
              },

              {
                question:
                  "What insights do Body part movement distributions offer to surgeons?",
                images: "/assets/images/plot.jpg",
                answer:
                  "Body part movement distributions, depicted through violin charts, offer a clear depiction of movement data distribution across specific body parts. They aid in understanding movement patterns and variations, facilitating thorough analysis and guiding surgical decisions by providing insights into preoperative assessment and postoperative progress monitoring.",
              },

              {
                question:
                  "How do Surgeons utilize Movement Comparison of all body parts in surgical planning?",
                images: "/assets/images/movement.jpg",
                answer:
                  "Surgeons utilize boxplot charts for Movement Comparison of all body parts to discern patterns among individuals, aiding in surgical planning and predicting potential challenges. These concise visual representations of movement data help surgeons analyze variations and make informed decisions.",
              },

              {
                question:
                  "Why are Joint Angles over Time crucial for surgeons during surgery?",
                images: "/assets/images/joint.jpg",
                answer:
                  "Joint Angles over Time provide surgeons with real-time insights into joint dynamics, enabling precise decisions and ensuring safety and efficacy during surgery. By monitoring variations, surgeons can promptly detect anomalies, adjust their approach as needed, and enhance surgical outcomes for optimal patient care.",
              },

              {
                question:
                  "How do Surgeons benefit from the Top Six Significant Body parts velocity Plot during procedures?",
                images: "/assets/images/angle.jpg",
                answer:
                  "Surgeons benefit from velocity plots of significant body parts by gaining invaluable insights during procedures. These plots track velocity changes over consecutive frames, allowing for precise monitoring of key body movements. By analyzing trends and fluctuations, surgeons can better understand patient movement dynamics, aiding in surgical decision-making and enhancing overall procedural outcomes.",
              },

              {
                question:
                  "What role do Distance between body parts over time charts play in surgical precision?",
                images: "/assets/images/body.jpg",
                answer:
                  "Distance between body parts over time charts are crucial for surgical precision as they track fluctuations in spatial relationships across consecutive frames. By analyzing these patterns, surgeons gain invaluable insights into patient movement dynamics, aiding in informed surgical interventions and optimizing patient outcomes.",
              },

              {
                question:
                  "How do Body parts Coordinates Comparison charts assist surgeons in surgical planning and execution?",
                images: "/assets/images/coordinate.jpg",
                answer:
                  "Body parts Coordinates Comparison charts visually map the relationship between coordinates of key body parts, aiding surgeons in surgical planning and execution. By comparing coordinates across recorded activities, surgeons gain insights into spatial relationships and optimize surgical interventions for better patient outcomes.",
              },

              {
                question:
                  "What is the significance of the X and Y Distance Correlation Matrix heatmap in surgery?",
                images: "/assets/images/correlation.jpg",
                answer:
                  "The X and Y Distance Correlation Matrix heatmap is an invaluable tool for surgeons as it showcases the correlation between X and Y distances of specific key point pairs during surgical procedures. By visualizing these correlations, surgeons can analyze spatial relationships and patterns between body parts, aiding in precise interventions and optimizing patient outcomes.",
              },
              {
                question: "What is an Instrument Confidence Histogram?",
                images: "/assets/images/histogram.jpg",
                answer:
                  "An Instrument Confidence Histogram is a graphical representation of confidence scores for surgical instruments such as Needle Holders, Scissors, and Spring Forceps. These scores are crucial for surgeons as they indicate the reliability of tools, help in managing risks during surgery, and contribute to refining surgical techniques for better patient safety and outcomes.",
              },
              {
                question:
                  "What are the benefits of utilizing confidence scores in surgical practice?",
                answer:
                  "Utilizing confidence scores for surgical instruments offers several benefits, including improved tool selection, better risk management during surgeries, and the continuous enhancement of surgical techniques. Ultimately, these benefits contribute to higher levels of patient safety and better surgical outcomes.",
              },
              {
                question:
                  "What does the Average Velocity for Instruments with High Means Confidence chart provide for surgeons?",
                images: "/assets/images/averagevelocity.jpg",

                answer:
                  "This chart offers a direct comparison of operational speeds for various medical instruments. Surgeons can swiftly assess and compare the efficiency of different tools by displaying average velocity values on radar axes and associating them with instrument IDs. This enables informed decisions during procedures, helping prioritize instruments with higher operational speeds for enhanced workflow and potentially improved patient outcomes.",
              },
              {
                question:
                  "What information does the Sorted Confidence for Each Unique Instrument chart provide for surgeons?",
                images: "/assets/images/sorted.png",

                answer:
                  "This chart offers surgeons a means to evaluate the reliability of various medical instruments. By correlating instrument IDs with their confidence values, surgeons can quickly identify the most dependable tools for patient care and diagnosis. This visual representation aids informed decision-making during procedures, enabling the selection of instruments with higher confidence values, which ultimately contributes to more accurate diagnoses and effective treatments.",
              },
              {
                question:
                  "What does the Visibility Percentage by Class chart provide for surgeons?",
                images: "/assets/images/visible.jpg",

                answer:
                  "This chart offers surgeons insights into the visibility of surgical instruments during operations. Each bar represents a different instrument type, aiding in assessing clarity relative to others. Surgeons can optimize lighting or positioning for better visibility, ensuring precise procedures and enhancing patient safety and outcomes.",
              },
              {
                question: "How can surgeons benefit from Velocity Line Graphs?",
                images: "/assets/images/velocity.jpg",

                answer:
                  "Velocity Line Graphs display velocity variations for diverse surgical instruments throughout procedures. Surgeons can utilize this data to optimize instrument usage, potentially enhancing surgical efficiency and patient outcomes. Monitoring movement speed enables real-time adjustments, ensuring instruments are used effectively for smoother surgeries.",
              },
              {
                question:
                  "What insights can surgeons gain from the Total Distance Moved By Instruments scatter plot?",
                images: "/assets/images/distance.png",

                answer:
                  "Each point on the scatter plot represents a specific instrument type, enabling surgeons to understand movement patterns and optimize performance adjustments during procedures. By correlating instrument categories with distance moved, surgeons gain valuable insights into usage dynamics, enhancing surgical outcomes through informed decision-making. This visualization aids in fine-tuning surgical techniques, potentially improving efficiency and patient care.",
              },
              {
                question:
                  "How does the Proximity Map for Analysis assist surgeons during procedures?",
                images: "/assets/images/proximity.jpg",
                answer:
                  "The proximity map illustrates the spatial arrangement of medical instruments, with each represented by a point indicating its center coordinates. Surgeons can utilize this visualization to assess instrument proximity during procedures, enhancing awareness and reducing collision risks. Understanding spatial relationships aids in optimizing workflow and ensuring efficient surgical operations.",
              },
            ],
          },
        ],
      },
    ],
  },
];

export default AdminData;
