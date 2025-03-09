variable "x"{
        type=string
        default="Welcome"
}
output "print"{
        value="${var.x} Mushahid"
}

variable "multiline"{
        type=string
        default=<<EOT
                This is First Line of code
                This is second
        EOT
}
output  "printgmultiline"{
        value=var.multiline
}

variable "mylist"{
        type=list
        default=[ "Rohit", "Raju"]
}

output "print_list"{
        value=var.mylist[1]
}

variable "mybool"{
        type=bool
        default=true
}
output "print_bool"{
        value=var.mybool
}


variable "mymap"{
        type=map
        default={
                "name"="myos"
                "city"="dhanbad"
}
}
output "print_map"{
        value=var.mymap["city"]
}
