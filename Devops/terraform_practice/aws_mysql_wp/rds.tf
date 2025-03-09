resource "aws_db_instance" "mydb"{
    allocated_storage = 10
    db_name = "mydb_wp"
    engine = "mysql"
    engine_version = "8.0.35"
    instance_class = "db.t3.micro"
    username="admin"
    password="redhat123"
    db_subnet_group_name = aws_db_subnet_group.rds_sub_group.name 
    vpc_security_group_ids = [aws_security_group.mysgmysql.id]
    parameter_group_name = "default.mysql8.0"
    skip_final_snapshot = true
}

output "end-point"{
    value=aws_db_instance.mydb.endpoint
}