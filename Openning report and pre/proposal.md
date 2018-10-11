# Project Proposal OOAD Fall 2018

## Project Abstract 

The overall goal for this project is to build an online platform in which users can use scripts uploaded by others and uploaded their own scripts. Additional ideas including making the platform a forum in which users can comment scripts or post requirements for scripts etc. 

## Team Members and Roles:

### Front-end development:

张兆旭

王雨童

张思宇 

### Databse development:

何海滨

### Architecture deisgn and Back-end development:

朱恒成

## Functional Requirements

The website provides a platform for executing command.
• The designer can upload their own scripts to server 

• The user pass the parameters by the website and then the server
execute the script 

• The superuser can manage all users and scripts 

## Feature Description

### Use Case Diagram
  <p align="center">
    <img src="https://github.com/Henrycobaltech/SUSTechLambda/blob/master/Openning%20report%20and%20pre/img/use_case.png" alt="Sample"  width="600" height="500">
    <p align="center">
        <em>Fig1. use case diagram</em>
    </p>
</p>

### User Stories

#### 1. User stories for super user
  
- **View user list (P1) and user's detail information**:
  
  As a superuser , I want to see the user list.

  1. I log in my account
  2. I am directed to my own profile page
  3. I click on the button "User Management"
  4. a window jump out with the list of user list and their information (latest log-in time, rank , active/inactive, registration time)
  5. I scroll the button to view more users
  6. I can click each person's name to open their main page
  7. I can also enter user's name into the search box on the head of the window to find some user
- **Update user info: e.g. reset the password, assign a role to a user (P2)**:
  
  As a super user , I want to Update user information.

  1. I log in my account
  2. I am directed to my own profile page
  3. I click on the button "User Management"
  4. a window jump out with the list of user list and their information(latest log-in time, rank , active/inactive, registration time)
  5. I click the "rank" column for some row shown (use different icon to represent different rank) in order to change its rank 
  6. I can also :heavy_check_mark: some people , selecting them as a group , and click the header of "rank" column to give a rank to this group 
  7. I can click :closed_lock_with_key: icon of each person to reset their key
- **Delete user: may be marked as inactive or ban a user (P1)**:
  
  As a super user , I want to delete user.
  1. I log in my account
  2. I am directed to my own profile page
  3. I click on the button "User Management"
  4. a window jump out with the list of user list and their information(latest log-in time, rank , active/inactive, registration time)
  5. I can click :heavy_check_mark: icon on the column "active" for each person to delete it or make it inactive , and this icon will become :heavy_multiplication_x: and this row will become gray with a line on it .
- **Run-time: how long at most can a script run (P2)**:
  
  
  As a super user , I want to set the max run-time for scripts.

  1. I log in my account
  2. I am directed to my own profile page
  3. I click on the button "Scripts Management"
  4. a window jump out with the list of all scripts and their information(author , size , memory , running-time , CPU usage , active/inactive , usage amount )
  5. I click the "set" button on the left bottom 
  6. a window jump out with settings on it
  7. I click "Max memory-occupation" box 
  8. the cursor will shining in the box and a image that shows current memory occupation condition will appear besides the box
  9. I enter the number into the box, then there will be time-clock on the left of the box which means they are checking the validation of the number
  10. a :heavy_check_mark: will supersede the time-clock if the number is valid , otherwise a :heavy_multiplication_x:
  11. I click "save" and close the window

- **Memory: how much memory can be used by a script (P1)**
- **CPU: how much CPU usage can be consumed by a script (P2)**:
  
  As a super user, I want to manage CPU usage/ Script Size.
  1. I login to the platform. 
  2. I enter 'executing setting'
  3. I entered the number on blank titling 'CPU Usage'/ 'Script Size'.
  4. I click button 'update setting'. 
- **Script size: what's the maximum file size of a script (P1)**
- **Manage scripts (P2)**:
  
  As a super user, I want to manage scripts.
  1. I login to the platform 
  2. I check a script on the script list.
  3. I click 'pin to the top' to pin this on the top of all the list.
  4. I click 'ban' to temporally delete the script.
  5. I click 'delete' to permanently delete the script.  
- **Login to the platform (P1)**:
  
  As a super user, I want to login to the platform.

  1. I open the home page
  2. I click on the login button
  3. I will be redirected to the login page
  4. I type in my username and password
  5. I click on the login button
  6. I will be redirected to the management portal


#### 2. User stories for script user
- **Run Scripts (P1)**:
  
  As a script user, I want to run a script.

  1. I open the scripts page
  2. I click on a script on the script list to choose it
  3. I will be redirected to a script launching page
  4. I type in the parameters
  5. I click on the launch button
  6. I will see a dialog showing the progress
  7. I see the result of the execution


- **View Script List (P1)**:
  
  As a script user, I want to view all the scripts.

  1. I open the home page
  2. I click on the scripts link
  3. I will be redirected to all scripts page
- **Comment (P2)**:
  
  As a script user, I want to comment a script.

  1. I open the script page
  2. I click on the script link
  3. I write my comments below the script
  4. I click on the comment button
  5. I will see my comment in the comment area
- **Rate (P2)**:
  
  As a script user, I want to rate a script. 
  1. I open the scripts page
  2. I click on a script on the script list to choose it
  3. I run it.
  4. I click to choose number of stars I would use to rate it. 
- **Script request(P2)**:
  
  As a script user, I want to request for a script. 
  1. I open the scripts page.
  2. I click and create a script request
  3. I write the description of the script I want to require for. 
  4. I update it. 
- **Login to the platform**:
  
  As a script user, I want to login to the platform.

  1. I open the home page
  2. I click on the login button
  3. I will be redirected to the login page
  4. I type in my username and password
  5. I click on the login button
  6. I will be redirected to the homepage

- **Create script lists (every list include a name, a description, and a set of links to specific scripts pages) (P2)**:
  
  As a script user, I want to create script lists.

  1. I open the scripts page.
  2. I click on and create a script list
  3. I enter the name of the script list I want to create
  4. I write the description of it
  5. I click on the add link button
  6. I will choose or search several specific scripts
  7. I add the links of these specific scripts
  8. I click on the finish button

#### 3. User stories for script designer
- **Create Scripts(P1)**:
  
  As a script designer, I want to create a script.

  1. I write a script for a specific need
  2. I open the scripts page
  3. I click on the upload button
  4. I choose the script to upload
  5. I click on the confirm button
  6. I will see my script uploading
  7. I set the parameter to be passed by a user
  8. I finish creating a script 
  9. I will see my script on the script list

- **View Scripts(P1)**:
  
  As a script designer, I want to view all my scripts.

  1. I open my personal page
  2. I click on scripts link
  3. I see a list of scripts designed by myself
- **Update Scripts(P1)**:
  
  As a script designer, I want to update my script.

  1. I open my scripts page (Same steps above as view all my scripts)
  2. I click on the script I want to update
  3. I will be redirected to the script design page
  4. I update the name, code, parameters etc. of the script
  5. I click on save button
- **Delete Scripts(P2)**:
  
  As a script designer, I want to delete my script.

  1. I open my scripts page 
  2. I click on the script I want to delete
  3. I will click on the confirm button
  4. I will be redirected to the script design page

- **Publish Scripts(P2)**:
  
  As a script designer, I want to publish the scripts.
  1. I open my scripts page
  2. I see scripts I wrote before
  3. I write the description and readme
  4. I click the bottom "publish" to publish the script.
- **Execute Scripts for testing (P3)**:
     
    As a script designer, I want to execute the script for testing.
  1. I open my scripts page
  2. I enter the debug mode. 
  3. I see a terminal and use Unix command to run and debug the scripts. 
- **Reply Comments (P3)**
- **Login to the platform (P1)**:
    
    As a script designer, I want to login to the platform.

  1. I open the home page
  2. I click on the login button
  3. I will be redirected to the login page 
  4. I type in my username and password
  5. I click on the login button
  6. I will be redirected to my personal page


### UI Design 

According to the functionalities of our Auto-Script website, we have designed the initial User Interface through Mockups. 

i. Home page: 
  
  This is the first page when you access our website ---- SUSTech Lambda.
  <p align="center">
    <img src="https://github.com/Henrycobaltech/SUSTechLambda/blob/master/Openning%20report%20and%20pre/img/8201539248659_.pic_hd.jpg" alt="Sample"  width="600" height="500">
    <p align="center">
        <em>Fig2. home page</em>
    </p>
</p>

[^_^]: ![homepage](https://github.com/Henrycobaltech/SUSTechLambda/blob/master/Openning%20report%20and%20pre/img/8201539248659_.pic_hd.jpg)

ii. Sign up and Log in page:
  
  We use dialoges for users to sign up or log in.
<p align="center">
    <img src="https://github.com/Henrycobaltech/SUSTechLambda/blob/master/Openning%20report%20and%20pre/img/8211539248685_.pic.jpg" alt="Sample"  width="300" height="360">
    <p align="center">
        <em>Fig3. sign up</em>
    </p>
</p>
<p align="center">
    <img src="https://github.com/Henrycobaltech/SUSTechLambda/blob/master/Openning%20report%20and%20pre/img/8221539248692_.pic.jpg" alt="Sample"  width="300" height="360">
    <p align="center">
        <em>Fig4. log in</em>
    </p>
</p>

iii. Script page:
  
  After pressing the “Try it now” button, you can enter the script-list page. There are many published scripts listing on the page. If you want to run some script, enter the “run” button. 
<p align="center">
    <img src="https://github.com/Henrycobaltech/SUSTechLambda/blob/master/Openning%20report%20and%20pre/img/8231539248701_.pic_hd.jpg" alt="Sample"  width="600" height="500">
    <p align="center">
        <em>Fig5. script page</em>
    </p>
</p>

iv. Script_detail page:
  
  In the script_detail page, there are detailed description of this script. If you want to run this script, you need to enter the necessary parameters and click the “run” button to see the result. You can vote or star the specific script. And you can also see the raw code of script if it is released by the publisher.

<p align="center">
    <img src="https://github.com/Henrycobaltech/SUSTechLambda/blob/master/Openning%20report%20and%20pre/img/8291539248794_.pic_hd.jpg" alt="Sample"  width="600" height="500">
    <p align="center">
        <em>Fig6. script detail page</em>
    </p>
</p>

v. Script_creating page:
  
  This is a page for creating or updating the script. This funtionality is only for developer.
  
  
<p align="center">
    <img src="https://github.com/Henrycobaltech/SUSTechLambda/blob/master/Openning%20report%20and%20pre/img/8281539248775_.pic.jpg" alt="Sample"  width="550" height="700">
    <p align="center">
        <em>Fig7. script creating page</em>
    </p>
</p>

vi. Forum page:
  
  There are requests for scripts and discussions on the forum page. Anyone can release a topic on the forum and provide your own solutions.
 
 <p align="center">
    <img src="https://github.com/Henrycobaltech/SUSTechLambda/blob/master/Openning%20report%20and%20pre/img/8241539248707_.pic_hd.jpg" alt="Sample"  width="600" height="500">
    <p align="center">
        <em>Fig8. forum page</em>
    </p>
</p>
 
vii. Profile page:
  
  Every user and developer have a profile which contains his/her personal information, recent contributions, and the personal script lists which can be either starred or created on his/her own.

<p align="center">
    <img src="https://github.com/Henrycobaltech/SUSTechLambda/blob/master/Openning%20report%20and%20pre/img/8271539248770_.pic.jpg" alt="Sample"  width="600" height="500">
    <p align="center">
        <em>Fig9. profile page</em>
    </p>
</p>

viii. User & Script management page(for superuser):
  
  These two pages can only be viewed by the superuser who can manage both users and scripts.

<p align="center">
    <img src="https://github.com/Henrycobaltech/SUSTechLambda/blob/master/Openning%20report%20and%20pre/img/8251539248727_.pic_hd.jpg" alt="Sample"  width="600" height="500">
    <p align="center">
        <em>Fig10. superuser page1</em>
    </p>
</p>


<p align="center">
    <img src="https://github.com/Henrycobaltech/SUSTechLambda/blob/master/Openning%20report%20and%20pre/img/8261539248751_.pic.jpg" alt="Sample"  width="550" height="700">
    <p align="center">
        <em>Fig11. superuser page2</em>
    </p>
</p>


## Architecture & Techinical Stack

In this project, we propose to use React.JS as our front-end framework and APS.Net as our back-end framework. No relational databases are used in this project. Instead, we propose to use MongoDB as databse for the project. The detail API architecture is as follows:

### Class Diagram
<p align="center">
    <img src="https://github.com/Henrycobaltech/SUSTechLambda/blob/master/Openning%20report%20and%20pre/img/class%20diagram.png"  width="600" height="500">
    <p align="center">
        <em>Fig12. class diagram</em>
    </p>
</p>


### Authentication APIs

Login: POST ~/api/login

Logout:  POST ~/api/lgout

### Scripts APIs

Query scripts: GET ~/api/scripts 

Scripts detail: GET ~/api/scripts/{id}



Create a new scripts: POST ~/api/scripts

Edit script: PUT ~/api/scripts/{id}

Delete script: DELETE ~/api/scripts/{id}

Run as script: POST ~/api/scripts/{id}/run

### Task APIs

Query Task: GET ~/api/tasks

Task detail: GET ~/api/tasks/{id}

### Comments APIs

Get comments of a script: GET ~/api/scripts/{id}/coments

Get a specific comment:  GET ~/api/scripts/{id}/coments/{comment-id}

Post a comment POST ~/api/scripts/{id}/comments

### Usermanagement APIs

Register user: POST ~/api/user/register

Query users: GET ~/api/users

Get user detail: GET ~/api/users/{id}

Edit user profiles: PUT  ~/api/users/{id}

Edit user options: PUT  ~/api/users/{id}/advanced

Reset user password: PUT  ~/api/users/{id}/password

## Timeline

Overall Design : September 6th - October 10th 

Implementation: October 11th - December 20th

Code review and connection: December 21st - January 1st

Test: January 1st - January 13th

