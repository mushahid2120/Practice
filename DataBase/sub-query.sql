use mydb;
show tables;
select distinct teacher_name from courses;
select * from orders order by order_time desc;
select * from students limit 2  offset 1;
select DATE('2021-2-12 10:20:43');
select distinct YEAR(order_time) from orders;

select * from courses;
select * from courses where course_name in ("DevOps","C++");
select * from courses where course_name LIKE "%Ops";
select * from orders where course_id in (select cid from courses where price>300);
select * from orders;
select count(*) from orders group by student_id;
select student_id,count(course_id) from orders group by student_id;