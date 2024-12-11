Same as pet the specimen, I've already demonstrated how to solve a challenge like this during the bootcamp, the app is a windows desktop app : 

![alt text](../../Images/{D1620CD0-12A0-46B8-B6CC-B46253E1B41B}.png)

We can use x64dbg to debug our program and get the flag. Use the "search for" command and look for strings in all module : 

![alt text](../../Images/{2211923B-AF5E-4BF5-A4BB-B1FF1BE46D09}.png)

We'll search for this error : 

![alt text](../../Images/{5FF76785-2F3F-47EE-A0E3-C0891B53AFAE}.png)

The arrows on the left can help us understand find the condition that validates our input : 

![alt text](../../Images/{405D7ED4-F203-47F4-BB0F-60567E4B8D7C}.png)

Which is these two lines : 

00007FF674BD19A7 | 85D2                     | test edx,edx                            |
00007FF674BD19A9 | 75 1D                    | jne revengineergaming.7FF674BD19C8      |

So I'll put a breakpoint here and see what'll happen when I reach this part after I input my credentials (Almost like that one web challenge): 

![alt text](../../Images/{4EDE7A81-B829-4753-A91E-D36B09BE0BA5}.png)

And there it is, in plain sight.