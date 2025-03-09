resource "aws_security_group" "mysgmysql"{
    name="mysg-mysql"
    vpc_id = aws_vpc.myvpc.id
    description = "This Security group  for wordpress allow all inbound and outbound "
    tags={
        Name="MySec Group Mysql"
    }
}

resource "aws_vpc_security_group_egress_rule" "allow_all_outbound_traffic_mysql" {
  security_group_id = aws_security_group.mysgmysql.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1" # semantically equivalent to all ports
}

resource "aws_vpc_security_group_ingress_rule" "allow_inbound_all_mysql" {
  security_group_id = aws_security_group.mysgmysql.id
  cidr_ipv4 = "0.0.0.0/0"
  ip_protocol       = "-1"
}