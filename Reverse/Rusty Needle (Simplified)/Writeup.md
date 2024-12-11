This program was made in rust, which is hard to decompile, I rewrote the description and the program to make it less guessy : 

![alt text](../../Images/{D899CEEF-C611-4399-A415-BC57CC8F945C}.png)

We're getting a "XOR'd flag". We know that we can reverse XOR operations if we partially know the string, all flags start with 0xGCD{ soo we'll try that :

![alt text](../../Images/{0C997BBB-F19C-4B6B-B770-3882D5067FE7}.png)

We'll have to convert these results to a string : 

![alt text](../../Images/{2DA70C26-7865-458D-9ADD-BC97FCBE047A}.png)

We get one part of the key and it starts with MrWhit, let's use it : 

![alt text](../../Images/{C4DD97A9-3F9D-45FA-BF97-31DD73EDE0CE}.png)

Close, but no cigar. We need one more element, this is the part where you'll have to guess that the key is MrWhite : 

![alt text](../../Images/{C83916CA-2944-4D17-8BF4-BE94D96D2BF2}.png)

