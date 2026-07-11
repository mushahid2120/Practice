
def count(num):
    i=0
    while(i<=num):
        yield i
        i=i+1

counting=count(10000)


def writing():
    with open('onelakh.txt','w') as f:
        breaking_line=20
        for c in counting:
            f.write(str(c)+" ")
            if c==breaking_line:
                f.write('\n')
                breaking_line=breaking_line+20



def iter_file():

    with open("onelakh.txt", "rb") as f:

        while chunk := f.read(6000):
            yield chunk

for num in iter_file():
    print(num)

# writing()