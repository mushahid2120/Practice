create user mushahid@localhost identified by 'redhat';
select user from mysql.user;
grant all privileges on *.* to mushahid@localhost;
show grants for mushahid@localhost;
flush privileges;
create user 'rohit'@'%' identified by 'redhat';
