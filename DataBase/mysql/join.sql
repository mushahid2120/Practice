create table students(
	sid int primary key auto_increment,
	name char(30),
    gender enum('M','F'),
    phone char(10)
	);

create table courses(
	cid int auto_increment,
    course_name char(20),
    price decimal(10,5),
    teacher_name char(30),
    primary key(cid)
    );

create table orders(
	oid int auto_increment primary key,
    course_id int,
    student_id int,
    order_time date,
    foreign key(course_id) references courses(cid),
    foreign key(student_id) references students(sid)
    );
    
select * from students;
describe students;
alter table students modify column price decimal(10,5);

insert into students (name,gender,phone) values
	("vimal",'M',"1111"),
    ("rahul",'F',"2222"),
    ("neha",'F',"3333")
    ;
    
insert into courses (course_name,price,teacher_name) values 
	("MongoDB",302.2,"Vimal Daga"),
    ("DevOps",1233,"Tom"),
    ("ML",321,"Vimal Daga"),
    ("C++",123,"Sourav");

insert into orders (course_id,student_id,order_time) values
	(1,3,'2023-02-05'),
    (4,1,'2022-10-15'),
    (3,2,'2023-12-23'),
    (2,3,'2023-05-10'),
    (1,2,'2020-08-08');

select * from orders;

select s.name,c.course_name,c.price,o.order_time,c.teacher_name
from orders o inner join courses c 
ON o.course_id=c.cid 
inner join students s
ON o.student_id=s.sid
;

select sum(price) from students ;
drop table students;

