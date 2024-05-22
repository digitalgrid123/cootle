import { images } from "../../next.config";

const SurgeonData = [
  {
    name: "Dashboard",
    details: [
      {
        question: "What information does the RecentSurgery Section display?",
        images: "/assets/images/recentsurgery.png",
        answer:
          "The section only shows information when the surgeon has the surgery to perform.",
        points: [
          "Surgery Name: Clearly identifies the type of surgery performed.",
          "Operation Theater: Specifies the location where the surgery took place, aiding in logistical coordination.",
          "Date of Surgery: Indicates the precise date when the surgery occurred, facilitating chronological organization of cases.",
          "Time of Surgery: Provides the exact time at which the surgery was performed, offering insights into scheduling and duration.",
        ],
      },
      {
        question: "What does the CompletedSurgery section do?",
        images: "/assets/images/completed.png",
        answer:
          "The CompletedSurgery section visualizes trends in completed surgeries over time. It generates an area chart showing the number of surgeries completed each month, allowing users to understand the distribution and patterns of surgical activity.",
      },
      {
        question: "What does the Surgery Types section do?",
        images: "/assets/images/type.png",
        answer:
          "The Surgery Types section visualizes data related to different types of surgeries. It generates a radial bar chart showing the distribution of surgeries among various types.",
      },
      {
        question:
          "What is the purpose of the Average Time Surgery Table section?",
        images: "/assets/images/average.png",
        points: [
          "Surgeons can compare the actual time taken for surgeries against the target times, allowing them to identify any deviations and make adjustments to improve efficiency.",
          "Having insights into the average time taken for each surgery type helps surgeons in better planning and scheduling of their procedures.",
        ],
        answer:
          "The Average Time Surgery Table section is designed to display data related to different types of surgeries, including the surgery type, actual time taken for each surgery on average, and the target time for each surgery.",
      },
      {
        question: "What does the Stats section do?",
        images: "/assets/images/stats.png",
        points: [
          "Surgeons can efficiently manage their time and resources by knowing the number of scheduled surgeries.",
          "Visibility into the number of completed surgeries enables surgeons to track their progress and efficiency.",
        ],
        answer:
          "The Stats section is responsible for displaying statistics related to surgeries. It presents information such as the number of scheduled surgeries and the number of completed surgeries in a visually appealing manner.",
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
          "You can navigate through different months in the calendar by clicking on the 'Prev' or 'Next' buttons, or by clicking on the 'Today' button to return to the current month.",
      },
      {
        question:
          "Can I add a new schedule for surgery directly from the calendar?",
        answer:
          "Yes, you can add a new schedule for surgery directly from the calendar by clicking on the '+ Schedule Surgery' button located at the top right corner of the page. This will open a form where you can enter details such as the surgery name, type, start and end date, operation theater, main surgeon, and additional staff details. After filling out the form, you can submit it to create the surgery schedule.",
      },
      {
        question:
          "Is it possible to view details of a scheduled surgery from the calendar?",
        answer:
          "Yes, you can view details of a scheduled surgery by clicking on the specific event in the calendar. This will open a drawer displaying information about the selected surgery.",
      },
      {
        question: "How do I view different types of calendar views?",
        answer:
          "You can view different types of calendar views by selecting options from the dropdown menu located at the top right corner of the calendar. Options include day, week, and month views.",
      },
      {
        question:
          "Can I select a specific date to view surgeries scheduled for that day?",
        answer:
          "Yes, you can select a specific date on the calendar to view surgeries scheduled for that day by clicking on the date. This will allow you to see detailed information about surgeries scheduled for the selected date.",
      },
    ],
  },
  {
    name: "Analytics",
    details: [
      {
        question: "What does the analytics dashboard for surgeons offer?",
        images: "/assets/images/analytics.jpg",
        points: [
          "Surgeons can filter and search for analyses based on criteria such as surgeon name, surgery type, and status.",
          "Detailed analysis details are provided, including main surgeon, surgery type, analysis start and completion times, and status.",
          "Surgeons have access to detailed analysis results.",
          "Actions such as stopping ongoing analyses can be taken if necessary.",
        ],
      },
      {
        question:
          " How can I filter the analytics data by surgeon's name, surgery type, and status?",
        answer:
          "You can use the search bar to filter analytics data by surgeon's name. Additionally, you can select specific surgery types and statuses using the dropdown menus provided.",
      },
      {
        question:
          "What actions can I perform on the analytics data if the analysis is in progress?",
        answer:
          "If the analysis is in progress, you have the option to stop the analysis. This can be done by clicking the cancel button represented by a red cross icon next to the analysis entry in the table.",
      },
      {
        question:
          "How can a surgeon benefit from stopping the analysis if it's in progress?",
        answer:
          " Stopping the analysis mid-process allows the surgeon to reallocate resources, redirect efforts based on preliminary findings, and prevent erroneous conclusions from incomplete or inaccurate data, ensuring better patient outcomes.",
      },
      {
        question: "What happens when the user clicks the View (Eye) button?",
        answer:
          "When the user clicks the View button, they will be directed to a new page displaying the analysis report",
      },
    ],
    subcategories: [
      {
        name: "Analysis Reports",
        details: [
          {
            question:
              "What  information are included in the analysis report page?",
            answer:
              "The analysis report page includes informations such as surgery videos, a summary of surgical risk and analytics, surgical details, and various charts visualizing different aspects of the surgery.",
          },
          {
            question: "How can users access and save the analysis report?",
            answer:
              "Users can download the generated report in PDF format, allowing them to save it for further reference or sharing.",
          },
          {
            question:
              "What actions are available to the user on the analysis report page?",
            answer:
              "On the analysis report page, users can perform actions such as creating a downloadable report, toggling the selection of different charts, and interacting with various components to explore the surgical data further.",
          },
          {
            question:
              "What functionality does the Create Report button provide on the analysis report page?",
            answer:
              "The Create Report button triggers the generation of a downloadable report based on the data and visualizations present on the page. Clicking this button initiates the report creation process, which includes capturing relevant charts and generating a PDF report for download.",
          },
          {
            question:
              "What types of charts and data are included in the surgery report?",
            answer:
              "The surgery report may include various types of charts and data analysis, such as bar charts, line charts, scatter plots, radar charts, box plots, and more, depending on the specific analytics and insights generated from the surgery videos.",
          },
          {
            question:
              "Can users share the surgery report with other healthcare professionals?",
            answer:
              "Yes, users can share the surgery report with other healthcare professionals for collaboration and consultation purposes. The report provides valuable insights that can facilitate discussions and decision-making among medical teams.",
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

          {
            name: "HP CHART",
            details: [
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
            ],
          },
        ],
      },
    ],
  },
  {
    name: "My Surgeries",
    details: [
      {
        question:
          "What functionalities does the surgery management interface offer to surgeons?",
        images: "/assets/images/surgeries.jpg",
        points: [
          "Surgeons can view, search, and edit existing surgeries.",
          "They have the ability to add new surgeries through a convenient Add Surgery button.",
          "Detailed surgery information can be accessed by clicking on each surgery, aiding informed decision-making.",
          "A separate screen facilitates input of Analytics Reports based on dates for added convenience.",
        ],
      },
      {
        question: "How can I add a new surgery?",
        answer:
          "To add a new surgery, simply click on the 'Add Surgery' button located at the top right corner of the Surgeries page.",
      },
      {
        question: "How do I search for a specific surgery?",
        answer:
          "You can search for a surgery by its name using the search bar provided on the Surgeries page. Just enter the name of the surgery you're looking for, and the results will be filtered accordingly.",
      },
      {
        question: "Can I filter surgeries by type?",
        answer:
          "Yes, you can filter surgeries by type. Use the dropdown menu labeled 'Select Type' to choose the type of surgery you want to filter by.",
      },
      {
        question: "How do I view details of a particular surgery?",
        answer:
          "To view details of a surgery, simply click on the surgery name in the Surgeries table. This will open a drawer displaying detailed information about the selected surgery.",
      },
      {
        question: "Is there a way to edit a surgery?",
        answer:
          "Yes, you can edit a surgery by clicking on the 'Edit' button next to the surgery in the Surgeries table. This will allow you to make changes to the surgery's information.",
      },
      {
        question:
          "Are there any restrictions on adding or editing surgeries based on my role?",
        answer:
          "Yes, your role may determine whether you have permission to add or edit surgeries. For example, surgeons may have different access levels compared to other users. Make sure to check your role permissions to see what actions you're allowed to perform.",
      },
      {
        question: "What does the surgery table display?",
        answer:
          "The surgery table displays various details related to surgeries, including the surgery name, type, main surgeon, operation theater, start and end dates of the surgery, status, and actions that can be performed on each surgery.",
      },
      {
        question: "What actions can I perform on surgeries from the table?",
        answer:
          "You can perform actions such as viewing details or editing surgeries directly from the table. Each surgery entry includes action buttons for viewing details and editing, allowing you to interact with the surgeries as needed.",
      },
      {
        question:
          "What happens when I click the 'View' eye icon in the surgery table?",
        answer:
          "Clicking the 'View' eye icon in the surgery table triggers the opening of the Analytics Reports Drawer from the right side of the screen.",
      },
      {
        question:
          "Can I view more details about a surgery from the Analytics Reports Drawer?",
        answer:
          "Yes, you can view more details about a surgery by clicking on the 'View' button within the Analytics Reports Drawer. This action will take you to a separate page or modal where you can access comprehensive details about the surgery.",
      },
      {
        question: "How can I access the Analytics Reports Drawer?",
        answer:
          "The Analytics Reports Drawer is typically accessed by clicking on a surgery entry in the Surgeries table. This action triggers the display of the drawer, showing detailed information about the selected surgery.",
      },
      {
        question:
          "What does the Analytics Reports Drawer contain besides Analytics Reports?",
        answer:
          "In addition to displaying detailed information about the selected surgery, the Analytics Reports Drawer also contains an action button labeled 'View.' This button allows you to further explore details or view a dedicated page related to the surgery.",
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
          "The Surgery Types page presents a list of different types of surgeries available within the system, offering users an organized overview of the various surgical procedures supported.",
      },

      {
        question: "What actions are available on the Surgery Types page?",
        answer:
          "On the Surgery Types page, users can add new surgery types by clicking the '+ Surgery Type' button, which opens a form  for inputting details about the new surgical procedure. Additionally, users can view existing surgery types and Edit  them as needed.",
      },
      {
        question:
          "What actions are available on the 'Edit' page for surgery types?",
        answer:
          "On the 'Edit' page, users can update an existing surgery type by modifying its details. Then the user click the Update surgery type the updated information is saved and show in the table.",
      },
      {
        question:
          "What happens when you click on the 'Add Surgery Type' button?",
        answer:
          "When you click on the 'Add Surgery Type' button, it triggers the display of a form where you can enter details such as the name of the surgery and its target time. After filling out the form and submitting it, then the information is saved as a new surgery type.",
      },
    ],
  },
];

export default SurgeonData;
