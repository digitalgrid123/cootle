import { images } from "../../next.config";

const HospitalData = [
  {
    name: "Dashboard",
    details: [
      {
        question:
          "Why should I care about analyzing hospital operational trends?",
        images: "/assets/images/totalhospital.jpg",
        answer:
          "Understanding operational trends helps you identify patterns in surgical activity, enabling better resource allocation, planning, and decision-making for optimizing hospital operations.",
      },
      {
        question: "How does Surgeon Performance data benefit me?",
        images: "/assets/images/surgeonhospital.jpg",
        answer:
          "Surgeon performance data provides insights into individual surgeons' productivity and efficiency over time, helping you assess workload distribution, identify top performers, and address any performance issues.",
      },
      {
        question:
          "What's the significance of the Completed Surgery Hospital section?",
        images: "/assets/images/completedsurgeryhospital.png",
        answer:
          "This section gives you a clear overview of the volume of surgeries conducted in your hospital monthly, aiding in capacity planning, identifying peak periods, and evaluating overall surgical activity trends.",
      },
      {
        question:
          "How does Visualizing Hospital Surgery Types help in decision-making?",
        images: "/assets/images/visualtype.png",
        answer:
          "It visually represents the types and frequencies of surgeries performed, assisting in identifying specialties or procedures with high demand, guiding strategic planning, and ensuring adequate resources are allocated for specific surgical needs.",
      },
      {
        question: "What's the relevance of the Today Stat's section?",
        images: "/assets/images/todaystats.jpg",
        answer:
          "Today Stat's provides real-time data on surgeries scheduled and completed for the day, facilitating immediate monitoring of surgical activity, managing workflow, and optimizing utilization of operation rooms based on current demand.",
      },
    ],
  },
  {
    name: "Calendar",
    details: [
      {
        question:
          "How can I navigate through different months in the calendar?",
        answer:
          "To move through different months in the calendar, simply use the 'Prev' or 'Next' buttons. You can also return to the current month by clicking on the 'Today' button.",
      },
      {
        question:
          "Can I add a new surgery schedule directly from the calendar?",
        answer:
          "Absolutely! Adding a new surgery schedule is easy. Just click on the '+ Schedule Surgery' button at the top right corner of the calendar page. This will open a form where you can fill in details like surgery name, type, dates, operation theater, main surgeon, and additional staff. Once you've completed the form, submit it to create the surgery schedule.",
      },
      {
        question:
          "Is it possible to view details of a scheduled surgery from the calendar?",
        answer:
          "Yes, you can easily view details of any scheduled surgery by clicking on the corresponding event in the calendar. This action opens a drawer showing all the information related to the selected surgery.",
      },
      {
        question: "How do I access different calendar views?",
        answer:
          "Accessing different calendar views is simple. Just go to the top right corner of the calendar and select your preferred view from the dropdown menu. Options include day, week, and month views.",
      },
      {
        question: "Can I check surgeries scheduled for a specific date?",
        answer:
          "Yes, you can. To view surgeries scheduled for a particular day, click on the date in the calendar. This action displays detailed information about surgeries scheduled for that specific date.",
      },
    ],
  },
  {
    name: "Surgeries",
    details: [
      {
        question:
          "What functionalities does the surgery management interface offer to surgeons?",
        images: "/assets/images/surgeries.jpg",
        points: [
          "Surgeons can easily view, search, and edit existing surgeries.",
          "Adding new surgeries is convenient with the 'Add Surgery' button.",
          "Access detailed surgery information by clicking on each surgery for informed decision-making.",
          "A separate screen allows input of Analytics Reports based on dates for added convenience.",
        ],
      },
      {
        question: "How can I add a new surgery?",
        answer:
          "Adding a new surgery is simple. Just click on the 'Add Surgery' button located at the top right corner of the Surgeries page.",
      },
      {
        question: "How do I search for a specific surgery?",
        answer:
          "To find a specific surgery, use the search bar on the Surgeries page. Enter the name of the surgery you're looking for, and the results will be filtered accordingly.",
      },
      {
        question: "Can I filter surgeries by type?",
        answer:
          "Yes, surgeries can be filtered by type. Use the dropdown menu labeled 'Select Type' to choose the type of surgery you want to filter by.",
      },
      {
        question: "How do I view details of a particular surgery?",
        answer:
          "To view details of a surgery, simply click on the surgery name in the Surgeries table. This action opens a drawer displaying detailed information about the selected surgery.",
      },
      {
        question: "Is there a way to edit a surgery?",
        answer:
          "Yes, you can edit a surgery by clicking on the 'Edit' button next to the surgery in the Surgeries table. This allows you to make changes to the surgery's information.",
      },
      {
        question:
          "Are there any restrictions on adding or editing surgeries based on my role?",
        answer:
          "Your role may determine your permission level for adding or editing surgeries. For example, surgeons may have different access levels compared to other users. Check your role permissions to see what actions you're allowed to perform.",
      },
      {
        question: "What does the surgery table display?",
        answer:
          "The surgery table shows various details related to surgeries, including surgery name, type, main surgeon, operation theater, start and end dates, status, and available actions for each surgery.",
      },
      {
        question: "What actions can I perform on surgeries from the table?",
        answer:
          "You can view details or edit surgeries directly from the table. Each surgery entry includes action buttons for viewing details and editing, enabling easy interaction with the surgeries.",
      },
      {
        question:
          "What happens when I click the 'View' eye icon in the surgery table?",
        answer:
          "Clicking the 'View' eye icon in the surgery table opens the Analytics Reports Drawer from the right side of the screen.",
      },
      {
        question:
          "Can I view more details about a surgery from the Analytics Reports Drawer?",
        answer:
          "Yes, you can view more details by clicking on the 'View' button within the Analytics Reports Drawer. This action takes you to a separate page or modal with comprehensive details about the surgery.",
      },
      {
        question: "How can I access the Analytics Reports Drawer?",
        answer:
          "The Analytics Reports Drawer is typically accessed by clicking on a surgery entry in the Surgeries table. This action displays the drawer, showing detailed information about the selected surgery.",
      },
      {
        question:
          "What does the Analytics Reports Drawer contain besides Analytics Reports?",
        answer:
          "In addition to showing detailed surgery information, the Analytics Reports Drawer includes an action button labeled 'View.' This button allows further exploration of details or viewing a dedicated page related to the surgery.",
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
              "The Analytics Reports page offers detailed analytics reports for a specific surgery, including hospital details, surgery start and end times, previous notes, and options to share or download the report.",
          },
          {
            question: "How can I access the Analytics Reports page?",
            answer:
              "Access the Analytics Reports page by clicking on the 'View' button within the Analytics Reports Drawer. This action opens the page, allowing you to view comprehensive analytics reports and surgery details.",
          },
          {
            question:
              "What actions are available on the Analytics Reports page?",
            answer:
              "On the Analytics Reports page, you can share the surgery report, download it as a PDF, or add new notes related to the surgery.",
          },
          {
            question:
              "What hospital information is displayed on the Analytics Reports page?",
            answer:
              "The Analytics Reports page shows various hospital details related to the surgery, including hospital name, operation theater room, and surgery start and end times, providing context and insight into the surgical procedure.",
          },
          {
            question:
              "How can I view previous notes associated with the surgery on the Analytics Reports page?",
            answer:
              "Previous notes related to the surgery are displayed on the Analytics Reports page. You can view them by scrolling through the section titled 'Previous Notes,' which lists user comments along with timestamps.",
          },
          {
            question:
              "How do I share the surgery report from the Surgery Detail page?",
            answer:
              "To share the surgery report from the Surgery Detail page, click on the 'Share' button at the top right corner. This action opens the Surgery Share Modal, allowing you to share the report with stakeholders or colleagues.",
          },
          {
            question:
              "What are the allowed video formats for uploading on the Surgery Detail page?",
            answer:
              "You can upload videos in formats such as .mp4, .mov, .webm for video analysis and viewing purposes.",
          },
          {
            question:
              "What is the maximum allowed size for uploading videos on the Surgery Detail page?",
            answer:
              "The maximum allowed size for video uploads is 200MB to ensure successful upload and analysis.",
          },
          {
            question:
              "Is there a restriction on the maximum length of videos that can be uploaded?",
            answer:
              "Yes, videos longer than 5 minutes are not allowed for upload to comply with upload requirements.",
          },
          {
            question: "Can I upload videos longer than 5 minutes?",
            answer:
              "No, videos longer than 5 minutes cannot be uploaded to the Surgery Detail page.",
          },
        ],
      },
    ],
  },
  {
    name: "Analytics",
    details: [
      {
        question: "What does the analytics dashboard offer for surgeons?",
        images: "/assets/images/analytics.jpg",
        points: [
          "Surgeons can easily filter and search analyses by criteria like surgeon name, surgery type, and status.",
          "Detailed analysis information includes main surgeon, surgery type, analysis start and completion times, and status.",
          "Surgeons have access to comprehensive analysis results.",
          "They can take actions such as stopping ongoing analyses if needed.",
        ],
      },
      {
        question:
          " How can I filter the analytics data by surgeon's name, surgery type, and status?",
        answer:
          "Filtering analytics data is straightforward. Use the search bar for the surgeon's name. Additionally, select specific surgery types and statuses from the dropdown menus provided.",
      },
      {
        question:
          "What actions can I take on the analytics data if the analysis is in progress?",
        answer:
          "If the analysis is ongoing, you have the option to stop it. Simply click the cancel button represented by a red cross icon next to the analysis entry in the table.",
      },
      {
        question:
          "How can a surgeon benefit from stopping the analysis if it's in progress?",
        answer:
          "Halting the analysis mid-process allows surgeons to reallocate resources, redirect efforts based on initial findings, and avoid drawing conclusions from incomplete or inaccurate data. This ensures better patient outcomes.",
      },
      {
        question: "What happens when the user clicks the View (Eye) button?",
        answer:
          "Clicking the View button directs you to a new page showing the analysis report.",
      },
    ],
    subcategories: [
      {
        name: "Analysis Reports",
        details: [
          {
            question:
              "What information is included in the analysis report page?",
            answer:
              "The analysis report page includes surgery videos, a summary of surgical risk and analytics, surgical details, and various charts visualizing different aspects of the surgery.",
          },
          {
            question: "How can users access and save the analysis report?",
            answer:
              "Users can download the report in PDF format for further reference or sharing.",
          },
          {
            question:
              "What actions are available to the user on the analysis report page?",
            answer:
              "Users can create a downloadable report, toggle different charts, and interact with various sections to explore surgical data further.",
          },
          {
            question:
              "What does the Create Report button provide on the analysis report page?",
            answer:
              "Clicking the Create Report button initiates the generation of a downloadable report based on the data and visualizations present on the page.",
          },
          {
            question:
              "What types of charts and data are included in the surgery report?",
            answer:
              "Charts and data analysis may include bar charts, line charts, scatter plots, radar charts, box plots, and more, depending on the specific insights generated.",
          },
          {
            question:
              "Can users share the surgery report with other healthcare professionals?",
            answer:
              "Yes, the report can be shared for collaboration and consultation among medical teams.",
          },
        ],
        subcategories: [
          {
            name: "OD CHART",
            details: [
              {
                question: "What is an Instrument Confidence Histogram?",
                images: "/assets/images/histogram.jpg",
                answer:
                  "An Instrument Confidence Histogram shows confidence scores for surgical instruments like Needle Holders, Scissors, and Spring Forceps. These scores help in tool selection, risk management, and refining surgical techniques for better patient safety and outcomes.",
              },
              {
                question:
                  "What are the benefits of confidence scores in surgical practice?",
                answer:
                  "Confidence scores improve tool selection, enhance risk management, and contribute to continuous improvement in surgical techniques, leading to better patient outcomes.",
              },
              {
                question:
                  "What does the Average Velocity for Instruments with High Means Confidence chart provide?",
                images: "/assets/images/averagevelocity.jpg",
                answer:
                  "This chart compares operational speeds for different instruments, aiding in efficient workflow and potentially improved patient outcomes.",
              },
              {
                question:
                  "What information does the Sorted Confidence for Each Unique Instrument chart provide?",
                images: "/assets/images/sorted.png",

                answer:
                  "This chart helps surgeons identify the most reliable tools for patient care and diagnosis.",
              },
              {
                question:
                  "What does the Visibility Percentage by Class chart provide?",
                images: "/assets/images/visible.jpg",

                answer:
                  "This chart offers insights into instrument visibility during operations, ensuring precise procedures and enhancing patient safety.",
              },
              {
                question: "How can surgeons benefit from Velocity Line Graphs?",
                images: "/assets/images/velocity.jpg",

                answer:
                  "Velocity Line Graphs aid in optimizing instrument usage for smoother surgeries.",
              },
              {
                question:
                  "What insights can surgeons gain from the Total Distance Moved By Instruments scatter plot?",
                images: "/assets/images/distance.png",

                answer:
                  "Surgeons gain insights into usage dynamics and movement patterns, potentially improving efficiency and patient care.",
              },
              {
                question:
                  "How does the Proximity Map for Analysis assist surgeons?",
                images: "/assets/images/proximity.jpg",
                answer:
                  "The proximity map helps in assessing instrument proximity, reducing collision risks, and optimizing workflow during procedures.",
              },
            ],
          },

          {
            name: "HP CHART",
            details: [
              {
                question:
                  "What is the significance of Upper Body Confidence Stats Table?",
                images: "/assets/images/table.jpg",
                answer:
                  "This table provides key statistical metrics for understanding patient capabilities and planning precise surgical interventions.",
              },

              {
                question:
                  "How do Radar Charts contribute to patient care and recovery processes?",
                images: "/assets/images/radar.jpg",
                answer:
                  "Radar Charts enable precise monitoring of individual performance, aiding in tailoring rehabilitation plans and optimizing surgical interventions.",
              },

              {
                question:
                  "What insights do Body part movement distributions offer?",
                images: "/assets/images/plot.jpg",
                answer:
                  "These charts aid in understanding movement patterns and variations, guiding surgical decisions.",
              },

              {
                question:
                  "How do Surgeons utilize Movement Comparison of all body parts?",
                images: "/assets/images/movement.jpg",
                answer:
                  "These boxplot charts help in discerning patterns among individuals and predicting potential challenges.",
              },

              {
                question:
                  "Why are Joint Angles over Time crucial for surgeons?",
                images: "/assets/images/joint.jpg",
                answer:
                  "They provide real-time insights into joint dynamics, ensuring safety and efficacy during surgery.",
              },

              {
                question:
                  "How do Surgeons benefit from the Top Six Significant Body parts velocity Plot?",
                images: "/assets/images/angle.jpg",
                answer:
                  "These plots aid in understanding patient movement dynamics and surgical decision-making.",
              },

              {
                question:
                  "What role do Distance between body parts over time charts play?",
                images: "/assets/images/body.jpg",
                answer:
                  "They track spatial relationships, aiding in informed surgical interventions.",
              },

              {
                question:
                  "How do Body parts Coordinates Comparison charts assist surgeons?",
                images: "/assets/images/coordinate.jpg",
                answer:
                  "They provide insights into spatial relationships, optimizing surgical interventions.",
              },

              {
                question:
                  "What is the significance of the X and Y Distance Correlation Matrix heatmap?",
                images: "/assets/images/correlation.jpg",
                answer:
                  "This heatmap showcases correlations between key point pairs during surgeries, aiding in precise interventions.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Surgery Type",
    details: [
      {
        question: "What does the Surgery Types page display?",
        images: "/assets/images/surgerytype.jpg",
        answer:
          "The Surgery Types page provides a list of different types of surgeries supported within the system, offering users an organized overview of available surgical procedures.",
      },
      {
        question: "What actions are available on the Surgery Types page?",
        answer:
          "Users can add new surgery types by clicking the '+ Surgery Type' button, which opens a form for inputting details about the new surgical procedure. Additionally, users can view existing surgery types and edit them as needed.",
      },
      {
        question:
          "What actions are available on the 'Edit' page for surgery types?",
        answer:
          "On the 'Edit' page, users can update an existing surgery type by modifying its details. After updating the information, users can click the 'Update surgery type' button to save the changes, which will then be reflected in the table.",
      },
      {
        question:
          "What happens when you click on the 'Add Surgery Type' button?",
        answer:
          "Clicking on the 'Add Surgery Type' button prompts the display of a form where users can input details such as the name of the surgery and its target time. After filling out the form and submitting it, the information is saved as a new surgery type.",
      },
    ],
  },
  {
    name: "User Management",
    details: [
      {
        question:
          "What is the User Management section, and how does it benefit me as a hospital admin?",
        images: "/assets/images/usermanagement.jpg",
        answer:
          "The User Management section allows you to manage surgeons who have access to the hospital's systems. You can see a list of approved surgeons and handle requests from those who want access. This helps ensure that only authorized personnel can perform surgeries in your hospital.",
      },
      {
        question:
          "How does the  button (Approved/Requested) in the User Management section help me?",
        images: "/assets/images/toggle.jpg",
        answer:
          "The button lets you switch between viewing approved surgeons and seeing requests from surgeons who want access. This makes it easier for you to manage permissions and handle new requests efficiently.",
      },
      {
        question:
          "What actions can I take as a hospital administrator regarding surgeon requests?",
        answer:
          "As a hospital admin, you have the authority to either accept or reject requests from surgeons who want access to the hospital. This ensures that only qualified and authorized individuals can perform surgeries in your facility.",
      },
      {
        question: "What happens when I accept a surgeon's request?",
        answer:
          "When you accept a surgeon's request for access, they become a part of the hospital's authorized users. They receive an email notification informing them of their acceptance, allowing them to perform surgeries within the hospital.",
      },
      {
        question:
          "What information can I see about surgeons in the User Management table?",
        answer:
          "The User Management table displays various attributes of surgeons, including their name, email, phone number, and license number. Additionally, you can view their license PDF directly from the table.",
      },
    ],
  },
  {
    name: "Operation Theater",
    details: [
      {
        question: "What is the purpose of the Operation Theater section?",
        images: "/assets/images/otptheater.jpg",

        answer:
          "The Operation Theater section helps you manage all aspects related to your hospital's operation theaters in one place. You can view, search, and perform actions like adding or deleting operation theaters.",
      },
      {
        question: "How can I benefit from using this section?",
        answer:
          "By using this section, you can efficiently organize and monitor your hospital's operation theaters. It enables you to easily find specific operation theaters using the search functionality, add new ones when needed, and remove outdated ones.",
      },
      {
        question: "What actions can I perform with this section?",
        images: "/assets/images/otptheatersearch.jpg",
        points: [
          "Searching for specific operation theaters by name.",
          "Adding new operation theaters.",
          "Deleting existing operation theaters that are no longer in use.",
        ],
      },
      {
        question: "How does the search feature help me?",
        images: "/assets/images/otptheatersearch.jpg",
        answer:
          "The search feature allows you to quickly find operation theaters by their names. This can be useful when you have a large number of operation theaters and need to locate a specific one without scrolling through the entire list.",
      },
      {
        question: "Can I create new operation theaters with this section?",
        images: "/assets/images/otptheatersearch.jpg",
        answer:
          "Yes, you can. Simply click on the '+ Create New' button, and you'll be able to add details for a new operation theater.",
      },
      {
        question: "Is there a way to delete operation theaters?",
        answer:
          "Absolutely. If there's an operation theater that you no longer need, you can delete it by selecting it and confirming the deletion. This helps keep your operation theater list up-to-date.",
      },
      {
        question: "What happens if I accidentally delete an operation theater?",
        answer:
          "Don't worry. The section includes a confirmation step before deleting any operation theater. This helps prevent accidental deletions.",
      },
      {
        question: "How do I edit the details of an existing operation theater?",
        answer:
          "You can edit the details of an existing operation theater by selecting it from the list and then clicking on the 'Edit' button. This will allow you to modify the name, assigned equipment, or any other relevant information.",
      },
    ],
  },
  {
    name: "Subscription",
    details: [
      {
        question: "What is the Monthly Subscription?",
        images: "/assets/images/subscription.jpg",
        answer:
          "The Monthly Subscription allows hospital admins to access a range of features for managing their operation theaters effectively.",
      },

      {
        question: "What does the Monthly Subscription include?",
        images: "/assets/images/submonth.jpg",
        answer:
          "For $1000 (amount can vary) per operation theater, hospital admins get:",
        points: [
          "Unlimited access to analytics reports, helping them track performance and make informed decisions.",
          "The ability to add an unlimited number of surgeons to their team.",
          "Unlimited scheduling for surgeries, ensuring efficient planning and utilization of resources.",
        ],
      },
      {
        question: "How do I purchase the Subscription?",
        images: "/assets/images/subpurchase.jpg",
        answer:
          "To purchase the subscription, simply select the number of operation theaters you need from the dropdown menu and click 'Purchase Subscription.'",
      },
      {
        question: "Why should I consider purchasing the Subscription?",
        answer:
          "Purchasing the subscription grants hospital admins access to valuable tools and resources that streamline the management of operation theaters, ultimately enhancing operational efficiency and patient care.",
      },
    ],
  },
  {
    name: "Payment",
    details: [
      {
        question:
          "What is the purpose of the Payment section in the dashboard?",
        images: "/assets/images/paymenthospital.jpg",
        answer:
          "The Payment section allows you to manage and track invoices and payments related to surgeries and services provided by the hospital.",
      },
      {
        question: "How can I search for a specific invoice number?",
        images: "/assets/images/paymentsearch.jpg",
        answer:
          "You can easily search for a specific invoice number using the search bar provided in the Payment section. Just type in the invoice number you're looking for, and the system will filter the results accordingly.",
      },
      {
        question: "How can I filter payments by month or year?",
        images: "/assets/images/paymentsearch.jpg",
        answer:
          "You can filter payments by selecting the desired month and year from the dropdown menus available in the Payment section. This helps you narrow down the results and view payments specific to a particular time frame.",
      },
      {
        question: "What information is displayed in the Payment table?",
        images: "/assets/images/paymenthospital.jpg",
        answer:
          "The Payment table provides details such as the invoice number, month, number of surgeries (OTs), payment status, and the amount due for each transaction.",
      },

      {
        question:
          "How can I differentiate between paid, due, and failed payments?",
        answer: "The payment status is indicated by colored badges:",
        images: "/assets/images/paymentstatus.jpg",
        points: [
          "Green badge indicates 'Paid'.",
          "Red badge indicates 'Due'.",
          "Information icon signifies 'Transaction Failed'.",
        ],
      },
      {
        question: "Can I download invoices for record-keeping purposes?",
        images: "/assets/images/paymentdownload.jpg",
        answer:
          "Yes, you can download invoices directly from the Payment table by clicking on the download button associated with each invoice.",
      },
    ],
  },
  // {
  //   name: "Add Hospital",
  //   details: [
  //     {
  //       question: "What's the purpose of the 'Add Hospital' feature",
  //       images: "/assets/images/addhospital.png",
  //       answer:
  //         "When you click 'Add Hospital', you initiate the process of adding a new hospital to the system. This allows you to expand the network of hospitals within your platform.",
  //     },

  //     {
  //       question: "How does adding a hospital benefit ?",
  //       answer:
  //         "Adding hospitals increases the reach and availability of healthcare services within your platform. It enables you to onboard new healthcare providers, enhancing the overall user experience for patients and other stakeholders.",
  //     },

  //     {
  //       question:
  //         "What information do I need to provide when adding a hospital?",
  //       images: "/assets/images/hospitalprofile.png",
  //       answer:
  //         "You'll need to fill in details such as the hospital's name, contact number, location (state, city, address, zip code), and optionally, upload a logo for visual identification.",
  //     },

  //     {
  //       question:
  //         "Can I create profiles for hospitals and administrators separately?",
  //       images: "/assets/images/adminprofile.png",
  //       answer:
  //         "Yes, you have the flexibility to switch between creating profiles for hospitals and administrators. Simply toggle between 'Admin Profile' and 'Hospital Profile' to switch contexts based on your current task.",
  //     },

  //     {
  //       question: "What happens after I add a new hospital?",
  //       answer:
  //         "Once you've filled in the required information and saved the changes, the newly added hospital will become part of your platform's network. Patients and users will be able to access its services through your platform.",
  //     },
  //     {
  //       question: "Is there a limit to the number of hospitals I can add?",
  //       answer:
  //         "No, there's no limit to the number of hospitals you can add. You can continue to expand your network by adding as many hospitals as needed to meet the demands of your platform's users.",
  //     },

  //     {
  //       question: "How long does it take to add a new hospital?",
  //       answer:
  //         "The time it takes to add a new hospital depends on the completeness of the information provided and any validation processes involved. Typically, the process is quick and straightforward, allowing you to add hospitals efficiently.",
  //     },
  //   ],
  // },
  // {
  //   name: "Billing",
  //   details: [
  //     {
  //       question: "What's the purpose of the 'Billings' feature?",
  //       images: "/assets/images/billing.png",
  //       answer:
  //         "The 'Billings' feature provides an overview of financial transactions and invoices associated with hospitals within your platform. It helps you manage revenue streams and monitor financial activities.",
  //     },
  //     {
  //       question: "How does viewing billings benefit",
  //       answer:
  //         "Viewing billings allows you to track the financial health of hospitals within your platform. It provides insights into revenue generation, payment statuses, and overall financial performance.",
  //     },
  //     {
  //       question: "What information can I see in the billings section?",
  //       images: "/assets/images/billing.png",
  //       answer:
  //         "In the billings section, you can view details such as the hospital name, invoice number, billing month and year, number of OTs (Operating Theatres), billing status, and the billed amount for each transaction.",
  //     },
  //     {
  //       question: "Can I search for specific billings?",
  //       images: "/assets/images/billingsearch.png",
  //       answer:
  //         "Yes, you can search for specific billings by hospital name using the search bar provided. This enables you to quickly locate and review billing information for a particular hospital.",
  //     },
  //     {
  //       question: "How do I filter billings by month and year?",
  //       images: "/assets/images/billingfilter.png",
  //       answer:
  //         "You can filter billings by selecting a specific month and year from the dropdown menus provided. This allows you to focus on billings within a specific timeframe for better analysis.",
  //     },
  //     {
  //       question:
  //         "Is there a way to download billing data for further analysis?",
  //       images: "/assets/images/billingdownload.png",
  //       answer:
  //         "Yes, you can download billing data in CSV format for further analysis or reporting purposes. Simply click the 'Download CSV' button to export the billing data to your device.",
  //     },
  //     {
  //       question: "What does the 'Total Revenue' represent?",
  //       images: "/assets/images/billingrevenue.png",
  //       answer:
  //         "The 'Total Revenue' displayed at the top represents the sum total of all billed amounts across the filtered billing data. It gives you a quick overview of the total revenue generated within the selected timeframe.",
  //     },
  //     {
  //       question: "Can I view billing details for a specific hospital?",
  //       answer:
  //         "Yes, you can view billing details for a specific hospital by searching for its name or selecting it from the list of available hospitals. This allows you to focus on the billing information relevant to a particular hospital.",
  //     },
  //   ],
  // },
  // {
  //   name: "Hospitals",
  //   details: [
  //     {
  //       question: "What is the Hospitals section for?",
  //       images: "/assets/images/hospitals.png",
  //       answer:
  //         "The Hospitals  section provides a centralized view of all hospitals registered in the system. As a admin, you can easily manage and access information about different hospitals from this interface.",
  //     },
  //     {
  //       question: "How does the search functionality help me as a admin?",
  //       images: "/assets/images/hospitalssearch.png",
  //       answer:
  //         "The search bar allows you to quickly find specific hospitals by their name. This is helpful when you have a large number of hospitals registered and need to locate a particular one efficiently.",
  //     },
  //     {
  //       question: "What information can I see for each hospital?",
  //       images: "/assets/images/hospitals.png",
  //       answer:
  //         "For each hospital, you can see details such as its name, address, contact number, and the name and contact details of the admin associated with that hospital.",
  //     },
  //     {
  //       question:
  //         "Can I view more detailed information about a specific hospital?",
  //       images: "/assets/images/hospitalview.png",
  //       answer:
  //         "Yes, you can! By clicking on the 'View' button for any hospital, you can access additional details like the hospital's full address, admin's email, and contact number.",
  //     },
  //     {
  //       question:
  //         "What happens when I click on 'View' inside the single hospital action perform",
  //       images: "/assets/images/singlehospital.png",
  //       answer:
  //         "Clicking on 'View' redirects you to a dedicated page showcasing comprehensive details about the selected hospital.",
  //     },
  //     {
  //       question:
  //         "What information can I expect to find on the specific hospital detail page?",
  //       images: "/assets/images/singlehospital.png",
  //       answer:
  //         "The specific hospital detail page offers in-depth insights into the hospital, including its name, address, contact details, administrative information, and possibly additional services provided.",
  //     },
  //   ],
  //   subcategories: [
  //     {
  //       name: "Hospital Profile",
  //       details: [
  //         {
  //           question:
  //             "What is the purpose of the Hospital Detail section in our system?",
  //           images: "/assets/images/singlehospital.png",
  //           answer:
  //             "The Hospital Detail section serves as a centralized dashboard where you, as a admin, can view and manage detailed information about a specific hospital. This includes information on completed surgeries, available surgeons, operation theaters, and administrative details, helping you oversee operations effectively.",
  //         },
  //         {
  //           question:
  //             "What actions can I perform from the Hospital Detail page?",
  //           answer:
  //             "From the Hospital Detail page, you can perform several critical actions:",
  //           images: "/assets/images/singlehospital.png",
  //           points: [
  //             "Edit Hospital Details: Update contact information, address, or administrative details by clicking the 'Edit' button.",
  //             "Delete a Hospital: Remove a hospital from the system by using the 'Delete' button. This action brings up a confirmation modal to prevent accidental deletions.",
  //             "View Details on Completed Surgeries: By selecting a specific tab, you can view detailed records of all surgeries completed at the hospital.",
  //             "Manage Surgeons: Access and review the list of surgeons working at the hospital.",
  //             "Review Operation Theaters: Check details and statuses of the operation theaters available at the hospital.",
  //           ],
  //         },
  //         {
  //           question:
  //             "What information is displayed in the Hospital Information section?",
  //           answer: "The Hospital Information section displays:",
  //           images: "/assets/images/hospitalinfo.png",
  //           points: [
  //             "The name of the hospital.",
  //             "The hospital's contact number.",
  //             "The hospital's physical address including city and state.",
  //           ],
  //         },
  //         {
  //           question: "How can I view details of a completed surgery?",
  //           answer:
  //             "You can view detailed information about any completed surgery by clicking on the respective entry in the Completed Surgeries tab. This action opens a drawer on the side, providing detailed information about the surgery, such as date, surgeon involved, and surgery type.",
  //           images: "/assets/images/completedhospital.png",
  //         },

  //         {
  //           question:
  //             "What is the purpose of the Complete Surgery Table  section?",
  //           images: "/assets/images/completedhospital.png",
  //           answer:
  //             "The Complete Surgery Table  section displays a table containing information about completed surgeries, including details such as surgery name, surgeon assigned, operation theaters, date, and time of surgery.",
  //         },
  //         {
  //           question: "How can I search for a specific surgery?",
  //           images: "/assets/images/searchcomplete.png",
  //           answer:
  //             "You can search for a specific surgery by typing keywords into the search box provided above the table. This allows you to quickly locate surgeries based on their names.",
  //         },
  //         {
  //           question: "What does the date range picker do?",
  //           images: "/assets/images/datecomplete.png",
  //           answer:
  //             "The date range picker allows you to filter surgeries based on a specific date range. By selecting a start and end date, you can view surgeries that occurred within that time frame.",
  //         },
  //         {
  //           question: "Can I filter surgeries by operation theater?",
  //           images: "/assets/images/otpcomplete.png",
  //           answer:
  //             "Yes, you can filter surgeries by operation theater using the dropdown menu provided. This allows you to view surgeries that took place in a specific operation theater.",
  //         },
  //         {
  //           question: "What is the Surgeon Table  section used for?",
  //           images: "/assets/images/tab.png",
  //           answer:
  //             "The Surgeon Table  section displays a table containing information about surgeons, including their names, email addresses, license numbers, and phone numbers.",
  //         },
  //         {
  //           question: "How can I search for a specific surgeon?",
  //           images: "/assets/images/searchsurgeon.png",
  //           answer:
  //             "You can search for a specific surgeon by typing keywords into the search box provided above the table. This allows you to quickly locate surgeons based on their names, email addresses, license numbers, or phone numbers.",
  //         },
  //         {
  //           question: "What is the Operation Theater Table  section used for?",
  //           images: "/assets/images/otptab.png",
  //           answer:
  //             "The Operation Theater Table  section displays a table containing information about operation theaters, including their names, cameras assigned, and cameras' IP addresses.",
  //         },
  //         {
  //           question: "How can I search for a specific operation theater?",
  //           images: "/assets/images/otpsearch.png",
  //           answer:
  //             "You can search for a specific operation theater by typing keywords into the search box provided above the table. This allows you to quickly locate operation theaters based on their names.",
  //         },
  //         {
  //           question:
  //             "Can I view and manage the hospital's surgeons and operation theaters?",
  //           images: "/assets/images/tab.png",
  //           answer:
  //             "Yes, the  section includes tabs for managing both the surgeons and the operation theaters:",

  //           points: [
  //             "Surgeons Tab: Shows a list of all surgeons at the hospital, allowing you to view and possibly edit their details.",
  //             "Operation Theaters Tab: Provides a list of all operation theaters, their status, and other relevant details.",
  //           ],
  //         },
  //         {
  //           question: "What happens when I decide to delete a hospital?",
  //           answer:
  //             "When you click 'Delete,' a modal window will appear asking for confirmation to proceed with the deletion. This is to ensure that the action is not taken lightly, as deleting a hospital cannot be undone. The modal provides the hospital name and a warning that this action is irreversible.",
  //           images: "/assets/images/deletehospital.png",
  //         },
  //         {
  //           question:
  //             "How can I contact a hospital administrator directly from this section?",
  //           images: "/assets/images/adminhospital.png",
  //           answer:
  //             "The section displays the hospital administrator's contact information, including name, mobile number, and email, under the 'Hospital Admin' section. You can use these details to contact the admin directly.",
  //         },
  //         {
  //           question: "How does the Edit functionality work?",
  //           images: "/assets/images/edithospital.png",
  //           answer:
  //             "When you click the 'Edit' button, you will be redirected to a form where you can update the hospital's details. This may include the name, contact information, address, and administrative data. It's an essential feature for keeping hospital records up-to-date and ensuring that all information displayed is accurate and current.",
  //         },
  //         {
  //           question: "What is the Completed Surgery Drawer? How do I use it?",
  //           images: "/assets/images/drawerhospital.png",
  //           answer:
  //             "The Completed Surgery Drawer is a feature that provides detailed information about a specific surgery when selected. It slides out from the side of the screen, offering details such as the surgery date, the type of surgery, and the surgeon who performed it. You can access this drawer by clicking on an entry in the Completed Surgeries tab, which is particularly useful for reviewing past operations and ensuring compliance with healthcare standards.",
  //         },
  //         {
  //           question:
  //             "What happens when I click on the 'View' button in the CompletedSurgeryDrawer modal?",
  //           images: "/assets/images/navigate.png",
  //           answer:
  //             "Clicking on the 'View' button in the CompletedSurgeryDrawer modal directs you to the analysis report page. This page provides detailed insights and statistics about the completed surgery, offering valuable information to help you understand the surgical outcomes effectively.",
  //         },
  //         {
  //           question:
  //             "Can I add new surgeons or operation theaters from this section?",
  //           answer:
  //             "The current design of the section focuses on displaying existing data rather than adding new entries directly. To add new surgeons or operation theaters, you would typically navigate to specific sections of the administrative dashboard designed for adding new resources or personnel.",
  //         },
  //         {
  //           question: "What should I do if the delete action fails?",
  //           answer:
  //             "If the delete action fails, it could be due to a network issue or a server error. First, check your internet connection and try again. If the problem persists, report the issue to the technical support team, providing them with details of the error message (if any) and the time it occurred. They will investigate the issue to resolve it as quickly as possible.",
  //         },
  //         {
  //           question: "What does the 'Edit Profile' form do?",
  //           images: "/assets/images/edithospital.png",
  //           answer:
  //             "The 'Edit Profile' form allows users to update administrative or hospital profiles. Users can select between two profiles to edit: an admin profile and a hospital profile. Each profile has distinct fields that can be updated, such as name, contact number, address, logo, and more.",
  //         },
  //         {
  //           question: "What actions can I perform on an admin profile?",
  //           images: "/assets/images/edithospital.png",
  //           answer:
  //             "You can update details such as first name, last name, phone number, and email address of an admin. Simply input the new information and click 'Save Changes' to update.",
  //         },
  //         {
  //           question: "What actions can I perform on a hospital profile?",
  //           images: "/assets/images/profilehospital.png",
  //           answer:
  //             "For hospital profiles, you can update the hospital's name, contact number, address, state, city, and upload a new logo if needed. After making changes, click 'Save Changes' to update the profile.",
  //         },
  //         {
  //           question: "Why is it important to keep the admin profile updated?",
  //           answer:
  //             "Keeping the admin profile updated ensures that the correct contact information is available for administrative purposes. This facilitates communication and ensures smooth operation of the system.",
  //         },
  //         {
  //           question:
  //             "Can I upload a new profile picture for the admin account?",
  //           answer:
  //             "Currently, the system does not support uploading a new profile picture for the admin account. However, you can update other details such as the name, phone number, and email address.",
  //         },
  //         {
  //           question:
  //             "Is there a limit to the number of times I can edit the admin profile?",
  //           answer:
  //             "There is no specific limit to the number of times you can edit the admin profile. You can make changes as needed to ensure that the information remains accurate and reflects any updates or changes in the admin's details.",
  //         },
  //       ],
  //       subcategories: [
  //         {
  //           name: "Analytics Reports",
  //           details: [
  //             {
  //               question:
  //                 "What information does the Analytics Reports page provide?",
  //               images: "/assets/images/report.jpg",
  //               answer:
  //                 "The Analytics Reports page offers detailed analytics reports related to a specific surgery. It includes information such as hospital details, surgery start and end times, previous notes, and options to share the surgery report or download it as a PDF.",
  //             },
  //             {
  //               question: "How can I access the Analytics Reports page?",
  //               answer:
  //                 "You can access the Analytics Reports page by clicking on the 'View' button within the Analytics Reports Drawer. This action opens the page, allowing you to view comprehensive analytics reports and details associated with the selected surgery.",
  //             },
  //             {
  //               question:
  //                 "What actions are available on the Analytics Reports page?",
  //               answer:
  //                 "On the Analytics Reports page, you can perform actions such as sharing the surgery report or downloading it as a PDF. Additionally, you have the option to add new notes related to the surgery for reference.",
  //             },
  //             {
  //               question:
  //                 "What hospital information is displayed on the Analytics Reports page?",
  //               answer:
  //                 "The Analytics Reports page displays various hospital details related to the surgery, including the hospital name, operation theater room, and start and end times of the surgery. These details provide context and insight into the surgical procedure.",
  //             },
  //             {
  //               question:
  //                 "How can I view previous notes associated with the surgery on the Analytics Reports page?",
  //               answer:
  //                 "Previous notes related to the surgery are displayed on the Analytics Reports page. You can view these notes by scrolling through the section titled 'Previous Notes,' which lists comments made by users along with the timestamp of each comment.",
  //             },
  //             {
  //               question:
  //                 "How do I share the surgery report from the Surgery Detail page?",
  //               answer:
  //                 "To share the surgery report from the Surgery Detail page, click on the 'Share' button located at the top right corner of the page. This action opens the Surgery Share Modal, allowing you to share the report with relevant stakeholders or colleagues.",
  //             },
  //             {
  //               question:
  //                 "What are the allowed video formats for uploading on the Surgery Detail page?",
  //               answer:
  //                 "You can upload videos in the following formats on the Surgery Detail page: .mp4, .mov, .webm. These formats are supported for video analysis and viewing purposes.",
  //             },
  //             {
  //               question:
  //                 "What is the maximum allowed size for uploading videos on the Surgery Detail page?",
  //               answer:
  //                 "The maximum allowed size for uploading videos on the Surgery Detail page is 200MB. Ensure that the size of the video file does not exceed this limit to successfully upload the video for analysis.",
  //             },
  //             {
  //               question:
  //                 "Is there a restriction on the maximum length of videos that can be uploaded on the Surgery Detail page?",
  //               answer:
  //                 "Yes, there is a restriction on the maximum length of videos that can be uploaded on the Surgery Detail page. Videos with a maximum length of 5 minutes are allowed for upload. Ensure that the duration of the video does not exceed this limit.",
  //             },
  //             {
  //               question:
  //                 "Can I upload videos longer than 5 minutes on the Surgery Detail page?",
  //               answer:
  //                 "No, the Surgery Detail page restricts the upload of videos longer than 5 minutes. Ensure that the duration of the video you intend to upload does not exceed this limit to comply with the upload requirements.",
  //             },
  //             {
  //               question:
  //                 "What is the significance of Upper Body Confidence Stats Table in surgical medicine?",
  //               images: "/assets/images/table.jpg",
  //               answer:
  //                 "The Upper Body Confidence Stats Table provides surgeons with key statistical metrics to understand patient capabilities, mitigate risks, and plan precise surgical interventions. It aids in setting realistic expectations, monitoring postoperative progress, and contributes to ongoing research and education in the field of surgical medicine.",
  //             },

  //             {
  //               question:
  //                 "How do Radar Charts contribute to patient care and recovery processes?",
  //               images: "/assets/images/radar.jpg",
  //               answer:
  //                 "Radar Charts track distance covered and assess mobility, enabling precise monitoring of individual performance. This information aids in tailoring rehabilitation plans and optimizing surgical interventions for improved patient outcomes. Ultimately, the dashboard empowers surgeons with valuable insights to enhance patient care and recovery processes.",
  //             },

  //             {
  //               question:
  //                 "What insights do Body part movement distributions offer to surgeons?",
  //               images: "/assets/images/plot.jpg",
  //               answer:
  //                 "Body part movement distributions, depicted through violin charts, offer a clear depiction of movement data distribution across specific body parts. They aid in understanding movement patterns and variations, facilitating thorough analysis and guiding surgical decisions by providing insights into preoperative assessment and postoperative progress monitoring.",
  //             },

  //             {
  //               question:
  //                 "How do Surgeons utilize Movement Comparison of all body parts in surgical planning?",
  //               images: "/assets/images/movement.jpg",
  //               answer:
  //                 "Surgeons utilize boxplot charts for Movement Comparison of all body parts to discern patterns among individuals, aiding in surgical planning and predicting potential challenges. These concise visual representations of movement data help surgeons analyze variations and make informed decisions.",
  //             },

  //             {
  //               question:
  //                 "Why are Joint Angles over Time crucial for surgeons during surgery?",
  //               images: "/assets/images/joint.jpg",
  //               answer:
  //                 "Joint Angles over Time provide surgeons with real-time insights into joint dynamics, enabling precise decisions and ensuring safety and efficacy during surgery. By monitoring variations, surgeons can promptly detect anomalies, adjust their approach as needed, and enhance surgical outcomes for optimal patient care.",
  //             },

  //             {
  //               question:
  //                 "How do Surgeons benefit from the Top Six Significant Body parts velocity Plot during procedures?",
  //               images: "/assets/images/angle.jpg",
  //               answer:
  //                 "Surgeons benefit from velocity plots of significant body parts by gaining invaluable insights during procedures. These plots track velocity changes over consecutive frames, allowing for precise monitoring of key body movements. By analyzing trends and fluctuations, surgeons can better understand patient movement dynamics, aiding in surgical decision-making and enhancing overall procedural outcomes.",
  //             },

  //             {
  //               question:
  //                 "What role do Distance between body parts over time charts play in surgical precision?",
  //               images: "/assets/images/body.jpg",
  //               answer:
  //                 "Distance between body parts over time charts are crucial for surgical precision as they track fluctuations in spatial relationships across consecutive frames. By analyzing these patterns, surgeons gain invaluable insights into patient movement dynamics, aiding in informed surgical interventions and optimizing patient outcomes.",
  //             },

  //             {
  //               question:
  //                 "How do Body parts Coordinates Comparison charts assist surgeons in surgical planning and execution?",
  //               images: "/assets/images/coordinate.jpg",
  //               answer:
  //                 "Body parts Coordinates Comparison charts visually map the relationship between coordinates of key body parts, aiding surgeons in surgical planning and execution. By comparing coordinates across recorded activities, surgeons gain insights into spatial relationships and optimize surgical interventions for better patient outcomes.",
  //             },

  //             {
  //               question:
  //                 "What is the significance of the X and Y Distance Correlation Matrix heatmap in surgery?",
  //               images: "/assets/images/correlation.jpg",
  //               answer:
  //                 "The X and Y Distance Correlation Matrix heatmap is an invaluable tool for surgeons as it showcases the correlation between X and Y distances of specific key point pairs during surgical procedures. By visualizing these correlations, surgeons can analyze spatial relationships and patterns between body parts, aiding in precise interventions and optimizing patient outcomes.",
  //             },
  //             {
  //               question: "What is an Instrument Confidence Histogram?",
  //               images: "/assets/images/histogram.jpg",
  //               answer:
  //                 "An Instrument Confidence Histogram is a graphical representation of confidence scores for surgical instruments such as Needle Holders, Scissors, and Spring Forceps. These scores are crucial for surgeons as they indicate the reliability of tools, help in managing risks during surgery, and contribute to refining surgical techniques for better patient safety and outcomes.",
  //             },
  //             {
  //               question:
  //                 "What are the benefits of utilizing confidence scores in surgical practice?",
  //               answer:
  //                 "Utilizing confidence scores for surgical instruments offers several benefits, including improved tool selection, better risk management during surgeries, and the continuous enhancement of surgical techniques. Ultimately, these benefits contribute to higher levels of patient safety and better surgical outcomes.",
  //             },
  //             {
  //               question:
  //                 "What does the Average Velocity for Instruments with High Means Confidence chart provide for surgeons?",
  //               images: "/assets/images/averagevelocity.jpg",

  //               answer:
  //                 "This chart offers a direct comparison of operational speeds for various medical instruments. Surgeons can swiftly assess and compare the efficiency of different tools by displaying average velocity values on radar axes and associating them with instrument IDs. This enables informed decisions during procedures, helping prioritize instruments with higher operational speeds for enhanced workflow and potentially improved patient outcomes.",
  //             },
  //             {
  //               question:
  //                 "What information does the Sorted Confidence for Each Unique Instrument chart provide for surgeons?",
  //               images: "/assets/images/sorted.png",

  //               answer:
  //                 "This chart offers surgeons a means to evaluate the reliability of various medical instruments. By correlating instrument IDs with their confidence values, surgeons can quickly identify the most dependable tools for patient care and diagnosis. This visual representation aids informed decision-making during procedures, enabling the selection of instruments with higher confidence values, which ultimately contributes to more accurate diagnoses and effective treatments.",
  //             },
  //             {
  //               question:
  //                 "What does the Visibility Percentage by Class chart provide for surgeons?",
  //               images: "/assets/images/visible.jpg",

  //               answer:
  //                 "This chart offers surgeons insights into the visibility of surgical instruments during operations. Each bar represents a different instrument type, aiding in assessing clarity relative to others. Surgeons can optimize lighting or positioning for better visibility, ensuring precise procedures and enhancing patient safety and outcomes.",
  //             },
  //             {
  //               question: "How can surgeons benefit from Velocity Line Graphs?",
  //               images: "/assets/images/velocity.jpg",

  //               answer:
  //                 "Velocity Line Graphs display velocity variations for diverse surgical instruments throughout procedures. Surgeons can utilize this data to optimize instrument usage, potentially enhancing surgical efficiency and patient outcomes. Monitoring movement speed enables real-time adjustments, ensuring instruments are used effectively for smoother surgeries.",
  //             },
  //             {
  //               question:
  //                 "What insights can surgeons gain from the Total Distance Moved By Instruments scatter plot?",
  //               images: "/assets/images/distance.png",

  //               answer:
  //                 "Each point on the scatter plot represents a specific instrument type, enabling surgeons to understand movement patterns and optimize performance adjustments during procedures. By correlating instrument categories with distance moved, surgeons gain valuable insights into usage dynamics, enhancing surgical outcomes through informed decision-making. This visualization aids in fine-tuning surgical techniques, potentially improving efficiency and patient care.",
  //             },
  //             {
  //               question:
  //                 "How does the Proximity Map for Analysis assist surgeons during procedures?",
  //               images: "/assets/images/proximity.jpg",
  //               answer:
  //                 "The proximity map illustrates the spatial arrangement of medical instruments, with each represented by a point indicating its center coordinates. Surgeons can utilize this visualization to assess instrument proximity during procedures, enhancing awareness and reducing collision risks. Understanding spatial relationships aids in optimizing workflow and ensuring efficient surgical operations.",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export default HospitalData;
