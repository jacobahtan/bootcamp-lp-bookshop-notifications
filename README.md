# Bookshop Solution for SAP BTP Developer Bootcamp - Launchpad Service

This project is developed for the purpose of an organised partner bootcamp. Participants may clone the repository, install/build & run on your local environment or (`recommended`) SAP Business Application Studio. It is an extended use case based on the topic of Digital Experience - SAP Launchpad; to illustrate a simple bookshop management solution with Notifications API services. _**To deploy this successful, please make sure you've completed the pre-requisite section.**_

## Runtime Demo of Notifications API in SAP Launchpad
![Notifications API for SAP Launchpad Service](https://user-images.githubusercontent.com/8436161/143732756-f79f8931-a706-4ff4-998e-b1a6ec74a344.png?raw=true)

## Pre-requisites
1. Deployed the [Bookshop solution](https://github.com/jacobahtan/bootcamp-cap-bookshop) that is based on SAP Cloud Application Programming model, in your SAP Business Technology Platform trial account.


![CAP Deployment 01](https://user-images.githubusercontent.com/8436161/143733017-f38d3bea-5498-473d-aa1f-4f446f72c64c.png?raw=true)
![CAP Deployment 02](https://user-images.githubusercontent.com/8436161/143733030-dc069dbc-053f-41ff-92bd-9aef32c68dcc.png?raw=true)


2. Enable notification for custom applications on SAP BTP
To enable custom apps to publish notifications, they need to send data to the service via a destination.
Follow [this guide](https://help.sap.com/viewer/8c8e1958338140699bd4811b37b82ece/Cloud/en-US/d5429a2a5d9a4425a461aa06c4ee84e4.html) to generate the notification service’s credentials and create a destination based on these credentials.

Launchpad site settings in the admin UI.
![Notifications Setup 01](https://user-images.githubusercontent.com/8436161/143733113-c06c290e-b516-4ed1-afdc-249785848bd1.png?raw=true)

Don’t forget to enable the “Show Notifications” settings of the Launchpad site that you want to use.
![Notifications Setup 02](https://user-images.githubusercontent.com/8436161/143733115-b07f9cbb-6a67-4641-ae68-22c1ed1093ed.png?raw=true)


## Let's Get Started
**Step 1:** Clone this Git Repo into a `bookshop-lp` project folder.
```bash
git clone https://github.com/jacobahtan/bootcamp-lp-bookshop-notifications.git bookshop-lp
```
**Step 2:** Define a `unique app name` for your own Bookshop solution.
We will utilise the existing SAP BTP services we've created for the bookshop solution to create additional service keys for the run time operation.
```bash
cf create-service-key bookshop-xsuaa-service uaa-key
cf create-service-key bookshop-destination-service destination-key
cf service-key bookshop-xsuaa-service uaa-key 
cf service-key bookshop-destination-service destination-key
```
Replace each respective service key into the respective section of the [default-env.json](https://github.com/jacobahtan/bootcamp-lp-bookshop-notifications/blob/main/default-env.json) file.
<p></p>
<details>
  <summary>Hint: Still unsure where to insert the service key credentials.</summary>

![Replace Service Keys](https://user-images.githubusercontent.com/8436161/143735203-57f3c08b-e4c9-4492-90fd-fe0cbe765bcc.gif)
<img src="https://user-images.githubusercontent.com/8436161/143735203-57f3c08b-e4c9-4492-90fd-fe0cbe765bcc.gif" width="100%">

</details>
<p></p>
Open [bookshop/mta.yaml](mta.yaml), go to line 128, locate appname parameter and replace the following:  `<REPLACE_THIS_WITH_SUBDOMAIN>` with your Unique Subdomain Name. 

![SAP BTP Unique Subdomain](https://user-images.githubusercontent.com/8436161/126601437-fae4fe44-fa63-46c8-9819-f8c68aedda88.png)

> Results: Parameter `appname` should be something like `bookcatalog-b7194982trial`.


<p></p>
<details>
  <summary>Hint: How to locate your unique Subdomain name.</summary>

![SAP BTP Unique Subdomain](https://user-images.githubusercontent.com/8436161/126601394-9d2ea36d-8d2a-44bc-b178-3aed760dbe9e.png)

</details>
<p></p>

**Step 3:** Package & Build with MTA then Deploy in your SAP BTP trial account.

Navigate into your bookshop folder, package your app with the MTA Build Tool.
```bash
cd bookshop
mbt build -t ./
```
Once completed, deploy the `bookshop_1.0.0.mtar` file in the `bookshop` folder, to your SAP BTP Cloud Foundry environment. 
> Please note that it depends if you follow the correct build command described above, the mtar file should be in `root project folder`, else check inside the mta_archives folder.
```bash
cf deploy bookshop_1.0.0.mtar
```
>Once you've successfully deployed, in the next part we will focus on running & test if the entire solution stack is running well within the Cloud (SAP BTP Trial Account). (Optionally) You could also test running your app locally in your IDE by creating a default-env.json file in your project root folder, connecting to the cloud with SAP HANA Cloud service key defined & (optional) destination services to S/4 HANA Cloud. More details on this Hybrid approach will be shared below.

**Step 4:** Run & Test your Solution in SAP BTP Trial Account - Cloud Foundry Environment.

`(Full Cloud experience in SAP BTP)` Run & Test your solution that is up & running hosted in your SAP BTP Trial Account.
- **i) Service App** (`bookshop-srv`): Navigate from your SAP BTP Account > Cloud Foundry > Spaces > Applications > bookshop-srv
![CF Applications](https://user-images.githubusercontent.com/8436161/128989726-9cd8013d-8873-4b41-b5d1-85c47bd52e1d.png)
- **ii) UI App** (`catalog`): Navigate from your SAP BTP Account > HTML5 Applications > catalog
![HTML5 Applications](https://user-images.githubusercontent.com/8436161/128989801-72e24218-43af-456b-8f09-2f0658fa770d.png)
- **iii) Database** (`bookshop-db`): Navigate from your SAP BTP Account > Cloud Foundry > Spaces > SAP HANA Cloud > Manage SAP HANA Cloud > Start > Open in SAP HANA Database Explorer > Add HANA DB ( + ) > Choose bookshop-db in the list > Explore Catalog > Table > Open SAP_CAPIRE_BOOKSHOP_BOOKS > Check if data exists in the table.
![HANA Cloud Manage](https://user-images.githubusercontent.com/8436161/128989853-d1c09fb1-ca48-41aa-a6c9-ee2d25cfbe46.png)
![HANA Cloud Add DB](https://user-images.githubusercontent.com/8436161/128989871-d9371455-9b7f-4132-aecc-b8cc1ae1edc6.png)
![HANA Cloud View DB Table](https://user-images.githubusercontent.com/8436161/128989887-7dbc61f8-9f12-4440-99bd-1eaf2b72de60.png)
> If the above full cloud experience is working perfectly fine, `Congratulations!` You've successfully deployed the solution stack in SAP BTP! You may skip below supplement step.

<p></p>
<details>
  <summary>Supplement Topic: (Optional) How to Run your App Local while connecting to Cloud Services in SAP BTP.</summary>
<p></p>

`(Hybrid experience with App local & DB cloud)` Run it (locally) with `cds watch` in your bookshop folder. 
Navigate into the _**bookshop**_ folder & install the _**required npm dependencies**_ declared in the package.json (takes about a few minutes).
```bash
cd bookshop
npm install
cds watch
```
To run it locally and connect with SAP BTP services, you'd need to create a local file `default-env.json` in your bookshop folder [bookshop/default-env.json](default-env.json) with the `hana`, `destination` & `xsuaa` service key credentials. You may refer to the default-env file as a template, then copy the service key into each component's credentials. 

>Repeat this for `hana`, `destination` & `xsuaa` service key; copy credentials key into the `default-env` file.

![Copy Service Key](https://user-images.githubusercontent.com/8436161/126619314-1dae032a-21f1-4b72-b354-906930e37447.gif)

</details>
<p></p>

<p></p>
<details>
  <summary>Supplement Topic: (Not Required) How to Undeploy MTA from my SAP BTP Account.</summary>
<p></p>

There are situations where you would required to redeploy a new version of MTA or met with an issue, for example change of database structure that requires to redeploy your SAP HANA Cloud DB, why not just undeploy the entire MTA solution and run end-to-end deployment again.
```bash
cf mtas
cf undeploy bookshop --delete-services --delete-service-keys
```

![Undeploy MTA](https://user-images.githubusercontent.com/8436161/127018607-e33b456e-9c77-47ca-85b9-d57ed885a15d.gif)

</details>
<p></p>



`(Optional)` **Step 5:** Connecting to your S/4 HANA Cloud System, please follow these steps.

In this step, you will require a S/4 HANA Cloud instance for this to work. Thus, if you do not have a S/4 HANA Cloud instance or NOT planning to work on the S/4 HANA component with Customer module within the Bookshop solution, you may skip this optional step entirely. However, do note that by skipping, eventually the customer module will not be working in your Bookshop solution. You should manage that accordingly prior to your newly acquired CAP knowledge.
* Create a destination in your SAP BTP trial account, pointing to your S/4 HANA Cloud system.
> Destination Name: `S4HC` 

> Destination URL: https://`<tenant>`.s4hana.ondemand.com

> Authentication: BasicAuthentication

> User: make sure this is a technical user setup to manage BusinessPartner service

> Password: xxxxxxxxxx

![S4HANA Destination in BTP Cockpit](https://user-images.githubusercontent.com/8436161/126614728-8741d39e-5d1a-4429-823c-5558435b15a2.png)

_Please note that the above destination name `S4HC` will be used in the Custom Logic file `Line 3` located in [srv/admin-service.js](srv/admin-service.js)._ Prior to that, please make sure you've done your own testing of calling the API with Postman to ensure that your credentials works.

If you face a problem with the example application or the description, feel free to create an [issue](https://github.com/jacobtan89/bootcamp-cap-bookshop/issues).

## Common Issues Faced
>MBT build Error: could not build the MTA project: could not execute the "make -f Makefile_20210721132444.mta p=cf mtar= strict=true mode= t=\"./\"" command: exec: "make": executable file not found in %PATH%

The make tool is required by the mbt tool. Linux and macOS are already shipped with make. For Windows you can download it from the GNU Make site:

Go to http://gnuwin32.sourceforge.net/packages/make.htm.
Choose the download with the description Complete package, except sources.
Run the installer.
Enter Edit the System Environment Variables in the Windows search box (Windows icon in the task bar). The System Properties dialog is opened.
Choose Environment Variables….
Choose your Path environment variable under User Variables for <your_user_name> and choose Edit.
Choose Browse and navigate to GNU make (usually C:\Program Files (x86)\GnuWin32\bin).
Click OK to add GNU make to your Path environment variable.
Restart VS Code to make the change effective.

- The problem is that you do not have the GNU Make 4.2.1 (min version) installed in your local environment, which is a dependency of the MTA Build Tool. Please, refer to the Prerequisites section of this link from the Help Portal: https://help.sap.com/viewer/c2b99f19e9264c4d9ae9221b22f6f589/2020_04_QRC/en-US/1412120094534a23b1a894bc498c2767.html
>SAP HANA Cloud Issues. DB Deployer Crashed. Execution of task "deploy" on application "bookshop-db-deployer" failed. Connection failed. Socket closed by peer.
- Make sure your SAP HANA Cloud service in your SAP BTP Trial account is up & running.
- Usually the service will be switched off automatically daily.
- In the SAP HANA Cloud advanced settings, make sure the connection is Open to `Allow all IP addresses`.

## Learn More

Learn more about the core concepts at [SAP Developer Tutorials on CAP Topic](https://developers.sap.com/tutorial-navigator.html?tag=software-product-function:sap-cloud-application-programming-model).

## License

Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. This file is licensed under SAP Sample Code License Agreement, except as noted otherwise in the [LICENSE](/LICENSE) file.
