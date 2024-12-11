![alt text](../../Images/{70D64CA3-52C6-40DA-9E6D-F3D7D483D5DB}.png)

This challenge requires you to input the right credentials to login, except the "right" credentials are randomly generated as you click login.

The vulnerability here is that we have access to the javascript :

![alt text](../../Images/{D7ED1CDD-9787-4688-B606-A6A97CB5AE31}.png)

I added a console log to help players find the login function : 

![alt text](../../Images/{EAD74D8C-E625-4F09-89A5-892330162FB0}.png)

With javascript you can put breakpoints and debug the code :

![alt text](../../Images/{5CE26252-05E8-4AF5-804F-C4BCB9146635}.png)

x and D are the "right" credentials, since we're in debug mode and x and D aren't const we can change them to be equal to our inputs (1 and 1 for example): 

![alt text](../../Images/{54739262-1DC6-4990-A768-D0B05CDA03C0}.png)

But we're not done yet, we still have a variable called jd that must not equal to 0, it is set to false, we'll simply make it true : 

![alt text](../../Images/{51C75B6D-A58F-4EBB-9529-70373FFE38A0}.png)

Resuming the script gives us the flag in the console : 

```0xGCD{4_b3dr00m_w1nd0w_m4d3_0u7_0f_br1ck5}```