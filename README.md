Module B9IS103 : **Computer System Security**

Team Members:
1) Anusha Beeraiah Mariswamy - 20028528
2) Chandu Lavu - 20026627
3) Gopika Kurumkulathil Vijayakumar - 20017757

Google docs link:
https://docs.google.com/document/d/15QRLofuhHuArmQfIR8cvsmJVy63wqvDWbAgX2_SLieU/edit 


Domain of Interest: 
**Secure Collaboration Tool For Students**

**Introduction:**
Secure collaboration tool for students are crucial in fast-paced learning environment. These solutions facilitate smooth interaction while safeguarding data privacy by enabling efficient file sharing, real-time communication, and project management. These application enhance learning outcomes and promotes inclusion by connecting with educational materials and offering easy navigation, user-friendly interfaces. They play a vital role in facilitating remote and hybrid learning methods and ensuring that students academic and personal data is protected by strong security protocols. Secure collaboration apps will become increasingly important in todays classroom as digital solutions develop, spurring creativity and improving the educational experiences for students.

**Overview:**
This project provides students with a safe platform for document collaboration that includes role-based access control, file management, and real-time editing. By providing a user-friendly platform that improves security, privacy, and the collaborative experience overall, it guarantees successful cooperation.

**Technologies Used:**
Back-end - Python (Flask) 
Front-end - React.js 
Database - SQLite 
Libraries - Bcrypt, Flask-JWT-Extended, Flask-SQLAlchemy, Flask Socket.IO


**Functional Requirements:**
1) Registration - User must be able to register with the unique username, password and select the access required for example, Student, Teacher, Admin. The password uses a hashing algorithm for which bcrypt is used.
2) Login - User should be able to log in with their username and password after which the user will receive a JWT token for authentication.
3) User Authentication - Only authenticated user will be able to access the system which will be done once the user validates JWT token authentication.
4) Document Management - User should be able to create, edit, view and share their documents stored in the database
5) Data Encryption - The content within the document will be encrypted using AES encryption . RSA will be used for secure key exchange between the users.
6) Secure Communication - The communication between client and the server uses HTTPS for encryption.





