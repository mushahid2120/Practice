resource "aws_route_table" "myrt" {
  vpc_id = aws_vpc.myvpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id=aws_internet_gateway.myigw.id
  }
  tags={
    Name="myigw-route"
  }
}

resource "aws_route_table_association" "myrt_assoc_1a"{
    subnet_id = aws_subnet.mypublic_subnet_1a.id
    route_table_id = aws_route_table.myrt.id
}
resource "aws_route_table_association" "myrt_assoc_1b"{
    subnet_id = aws_subnet.mypublic_subnet_1b.id
    route_table_id = aws_route_table.myrt.id
}