resource "aws_db_subnet_group" "rds_sub_group" {
  name="myrds-sub-group"
  subnet_ids = [aws_subnet.myprivate_subnet_1a.id,aws_subnet.myprivate_subnet_1b.id]  
  tags={
    name="my rds subnet group"
  }
}