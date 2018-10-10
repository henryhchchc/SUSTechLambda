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

![use_case](/Users/DeriZsy/GitHub_Projects/SUSTechLambda/Openning report and pre/img/use_case.png)

### UI Design 



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

