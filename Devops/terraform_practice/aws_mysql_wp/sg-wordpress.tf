resource "aws_security_group" "mysgwp"{
    name="mysg-wp"
    vpc_id = aws_vpc.myvpc.id
    description = "This Security group  for wordpress allow all inbound and outbound "
    tags={
        Name="MySec Group WP"
    }
}

resource "aws_vpc_security_group_egress_rule" "allow_outbound_all_wp" {
  security_group_id = aws_security_group.mysgwp.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1" # semantically equivalent to all ports
}

resource "aws_vpc_security_group_ingress_rule" "allow_inbound_all_wp" {
  security_group_id = aws_security_group.mysgwp.id
  cidr_ipv4 = "0.0.0.0/0"
  ip_protocol       = "-1"
}