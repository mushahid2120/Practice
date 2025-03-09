resource "aws_ebs_volume" "myebs" {
  size = 1
  availability_zone = aws_instance.myweb.availability_zone
  tags={
    Name="myebs-myweb-tf"
  }
}
resource "aws_volume_attachment" "ebs_attach" {
    device_name="/dev/sdb"
    volume_id = aws_ebs_volume.myebs.id
    instance_id = aws_instance.myweb.id
  
}