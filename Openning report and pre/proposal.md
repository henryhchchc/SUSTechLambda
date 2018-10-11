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

