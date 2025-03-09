
resource "aws_instance" "mywordpress"{
    ami= "ami-0298982da8499a634"
    instance_type= "t3.micro"
    key_name = "mystock-key"
    vpc_security_group_ids = [aws_security_group.mysgwp.id]
    subnet_id = aws_subnet.mypublic_subnet_1a.id
    tags={
        Name= "My Word Press"
    }
    depends_on = [ aws_route_table.myrt ]
}
