# Bookshop Solution for SAP BTP Developer Bootcamp - Launchpad Service

This project is developed for the purpose of an organised partner bootcamp. Participants may clone the repository, install/build & run on your local environment or (`recommended`) SAP Business Application Studio. 

It is an extended use case based on the topic of Digital Experience - SAP Launchpad; to illustrate a simple bookshop management solution with Notifications API services. 

_**To deploy this successful, please make sure you've completed the pre-requisite section.**_

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
**Step 2:** Create the required Service Keys for Local Runtime in SAP BAS.
We will be utilising the existing SAP BTP services we've created for the bookshop solution to create additional service keys for the run time operation.
```bash
cf create-service-key bookshop-xsuaa-service uaa-key
cf create-service-key bookshop-destination-service destination-key
cf service-key bookshop-xsuaa-service uaa-key 
cf service-key bookshop-destination-service destination-key
```
Replace each respective service key into the respective section of the [default-env.json](https://github.com/jacobahtan/bootcamp-lp-bookshop-notifications/blob/main/default-env.json) file.
<p></p>
<details>
  <summary>Hint: Click here to find out how and where to insert the service key credentials.</summary>

<img src="https://user-images.githubusercontent.com/8436161/143735203-57f3c08b-e4c9-4492-90fd-fe0cbe765bcc.gif" width="100%">

</details>

**Step 3:** Install required dependencies and run it locally.

Navigate into your bookshop-lp folder, and then run the following commands.
```bash
cd bookshop-lp
npm install
npm start
```

![Notifications API for SAP Launchpad Service](https://user-images.githubusercontent.com/8436161/143732782-32ed06c4-4d79-4745-8530-f43c37637808.png?raw=true)

Congratulations! You have just triggered your first notification from a custom-built app successfully.

Alternatively to running the application locally, you can also execute an HTTP client script that does the same for you. 

If you face a problem with the example application or the description, feel free to create an [issue](https://github.com/jacobahtan/bootcamp-lp-bookshop-notifications/issues).

## References
This repository project took reference from this [blog post, so do give it a good read for more explanation & breakdown](https://blogs.sap.com/2021/07/06/sending-notifications-from-sap-btp-applications-to-the-sap-fiori-launchpad/).


## License

Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. This file is licensed under SAP Sample Code License Agreement, except as noted otherwise in the [LICENSE](/LICENSE) file.
