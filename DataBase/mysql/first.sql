create database mydb;
use mydb;
show tables;
create table students (name char(30), mobile int, salary decimal, remark char(10));
describe table students;
select * from students;
insert into  students values 
	("mushahid",969325,2000,"good"),
    ("vikas",854652,1000,"ok"),
    ("Rohit",754124,4000,"good"),
    ("Raju",81253,3000,"vgood");
delete from students where name="mushahid";
set sql_safe_update=0;
truncate table students;
drop table students;

