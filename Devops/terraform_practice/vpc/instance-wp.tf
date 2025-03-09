
# resource "aws_instance" "mywordpress"{
#     ami= "ami-0298982da8499a634"
#     instance_type= "t3.micro"
#     key_name = "mystock-key"
#     vpc_security_group_ids = [aws_security_group.mysgwp.id]
#     subnet_id = aws_subnet.mypublic_subnet_1a
#     tags={
#         Name= "My Word Press"
#     }
# }

# resource "null-resource" "null-remote"{
#     provisioner "remote-exec" {
#       inline = [ 
#         "sudo yum install httpd git -y",
#         "sudo amazon-linux-extras intall -y mariadb10.5 php8.2",
#         "sudo git clone https://github.com/WordPress/WordPress.git",
#         "sudo mv WordPress/* /var/www/html/",
#         "sudo chown -R apache /var/www/html",
#         "sudo systemctl restart httpd"
#        ]
#     }

#     connection{
#         type="ssh"
#         user="ec2-user"
#          private_key = file("C:/Users/saba ahmad/Downloads/aws-key/mystock-key.pem")
#         host= aws_instance.myweb.public_ip
#     }
# }