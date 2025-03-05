#include<iostream>
#include<stdio.h>
using namespace std;

struct node 
{
    int item;
    node *left;
    node *right;
};

class avl
{
    node *root;
    public:
    avl();    //done
    int getbalance(node*);  //done 
    int height(node *t,int h);  //done 
    void rotateleft(node*,node*,node*,int);   //done   pending
    void rotateright(node*,node*,node*,int);   //done   pending
    void insert(int);            //done
    void del(int);              //done
    void preorder();        //done 
    void postorder();       //done
    void inorder();         //done
    ~avl();                 //done
    node* search(int);     //done
    bool is_empty();        //done
    void recinorder(node*);  //done
    void recpostorder(node*);  //done
    void recpreorder(node*);    //done
    void check(int);

};

avl::avl()
{
    root=NULL;
}

int avl::getbalance(node *t)
{   
    inorder();
    cout<<"\nbalance height of "<<t->item<<" ";
    cout<<"left height= "<<height(t->left,0)<<"  right height="<<height(t->right,0)<<"  balance factor ="<<height(t->left,0)-height(t->right,0)<<endl;
    return height(t->left,0)-height(t->right,0);
}

int avl::height(node *t,int h)
{
    if(t)
    {
        int a,b;
        //cout<<t->item<<" "<<" h="<<h<<" \n";
        a=height(t->left,h+1);
        b=height(t->right,h+1);
        return a>b ?a:b;
    }
    //cout<<"h="<<h<<endl;
    return h;
}

void avl::rotateleft(node *A,node *B,node *x,int data)//not done
{
    node *temp=NULL;
    if(B->left)
        temp=B->left;
    
    if(A==root)
    {
        root=B;
        B->left=A;
        A->right=NULL;
    }
    else
    {
        if(x->left==A)
        {
            x->left=B;
            B->left=A;
            A->right=NULL;
        }
        else
        {
            x->right=B;
            B->left=A;
            A->right=NULL;
        }
    }
    if(temp!=NULL)
        A->right=temp;

}

void avl::rotateright(node *A,node *B,node *x,int data)
{
    cout<<"hello 2\n";
    node *temp=NULL;
    if(B->right)
    temp=B->right;
    
    if(A==root)
    {
        cout<<" NULL case";
        root=B;
        B->right=A;
        A->left=NULL;
    }
    else
    {
        cout<<" not  a NULL case";
        if(x->left==A)
            {
                x->left=B;
                B->right=A;
                A->left=NULL;
            }
        else
            {
                x->right=B;
                B->right=A;
                A->left=NULL;
            }
    }

    if(temp!=NULL)
        A->left=temp;
}

void avl::insert(int data)
{
    node *t=new node;
    t->left=NULL;
    t->right=NULL;
    t->item =data;
    if(is_empty())
            root=t;
    else
    {
        node *temp=root;
        while(temp)
        {
            if(data==temp->item)
                {
                    cout<<"\nduplicate value not allowed\n";
                    break;
                }
            if(data>temp->item)
                {
                    if(temp->right==NULL)
                        {
                            temp->right=t;
                            check(data);
                            break;
                        }
                    else
                    temp=temp->right;
                }
                else
                {
                    if(temp->left==NULL)
                    {
                        temp->left=t;
                        check(data);
                        break;
                    }
                    else
                    temp=temp->left;
                }
        }
            
    }
}

void avl::del(int data)
{
    if(root==NULL)
        cout<<"tree is empty";
        else
        {
            node *ptr,*parptr,*t=root;
            ptr=NULL;
            parptr=NULL;

            while(t)
            {
                
                if(t->item==data)
                {
                    ptr=t;
                    break;
                }
                else
                if(data>t->item)
                    {
                        parptr=t;
                        t=t->right;
                    }
                else
                {
                    parptr=t;
                    t=t->left;
                }
                }

            if(ptr)
            {
                if(ptr==root)    //agar ptr khud root hua hai
                {
                    if(ptr->left==NULL && ptr->right==NULL) // sirf root hai left node hai to
                    {
                        delete ptr;
                        root=NULL;
                    }
                    else
                    if(ptr->left && ptr->right) //root ke do child hia toh
                    {
                        node *suc,*parsuc;
                        suc=ptr->right;
                        parsuc=ptr;
                        while(suc->left)
                        {
                            parsuc=suc;
                            suc=suc->left;
                        }

                        if(parsuc->right==suc)
                        {
                            root->item=suc->item;
                            root->right=suc->right;
                            delete suc;
                        }
                        else
                        {
                            parsuc->left=suc->right;
                            root->item=suc->item;
                            delete suc;
                        }
                    }

                    else                    //root ke ek child hai toh
                    {
                        if(root->left)
                        {
                            root=root->left;
                            delete ptr;
                        }
                        else
                        if(root->right)
                        {
                            root=root->right;
                            delete ptr;
                        }
                    }
                }
                else
                {
                    if(ptr->left==NULL && ptr->right==NULL)     //no child case
                    {
                        if(parptr->left==ptr)
                        {
                            delete ptr;
                            parptr->left=NULL;
                        }
                        else
                        {
                            delete ptr;
                            parptr->right=NULL;
                        }
                    }
                    else
                    if(ptr->left && ptr->right)           //two child case
                    {
                        node *suc,*parsuc;
                        suc=ptr->right;
                        parsuc=ptr;
                        while (suc->left)
                        {
                            parsuc=suc;
                            suc=suc->left;
                        }

                        if(parsuc->right==suc)
                        {
                            ptr->item=suc->item;
                            ptr->right=suc->right;
                            delete suc;
                        }
                        else
                        {
                            ptr->item=suc->item;
                            parptr->left=suc->right;
                            delete suc;
                        }
                    }
                    else                                    //   one child case
                    {
                        if(parptr->left==ptr)
                        {
                            if(ptr->left)
                            {
                                parptr->left=ptr->left;
                                delete ptr;
                            }
                            else
                            {
                                if(ptr->right)
                                {
                                    parptr->left=ptr->right;
                                    delete ptr;
                                }
                            }
                        }
                        else
                        {
                            if(ptr->right)
                            {
                                parptr->right=ptr->left;
                                delete ptr;
                            }
                            else
                            {
                                parptr->right=ptr->left;
                                delete ptr;
                            }
                        }
                    }
                }
            }
        }
}


bool avl::is_empty()
{
    return root==NULL;
}

node* avl::search(int data)
{
    node *t=root;
    while (t)
    {
        if(t->item==data)
            return t;
            else
        if(t->item>data)
        {
            t=t->left;
        }
        else
        t=t->right;
    }
    return NULL;
}

void avl::inorder()
{
    recinorder(root);
}
void avl::recinorder(node *t)
{
    if(t)
    {
    recinorder(t->left);
    cout<<t->item<<" ";
    recinorder(t->right);
    }
}
void avl::postorder()
{
    recpostorder(root);
}
void avl::recpostorder(node *t)
{
    if(t)
    {
    recinorder(t->left);
    recinorder(t->right);
    cout<<t->item<<" ";
    }
}

void avl::preorder()
{
    recpreorder(root);
}

void avl::recpreorder(node *t)
{
    if(t)
    {
        cout<<t->item<<" ";
    recinorder(t->left);
    recinorder(t->right);
    }
}

avl::~avl()
{
    while(root!=NULL)
    {
        del(root->item);
    }
}

void avl::check(int data)
{
    cout<<"hello 1\n";
    node *t=root,*A=NULL,*B=NULL,*C=NULL,*x=root;
    while(t)
    {
        cout<<"hi\n ";
        if(getbalance(t)>1 || getbalance(t)<-1)
            A=t;
            if(data>t->item)
                t=t->right;
            else
                t=t->left;
    }

        
    if(A)
            {
                while(x)
                {
                    if(x->left==A || x->right==A || A==root)
                        break;
                        if(A->item>x->item)
                            x=x->right;
                        else
                            x=x->left;
                }


                cout<<endl<<"KKKKKKKKK\n";
            if(data>A->item)
            {
                B=A->right;
                if(B->item>data)        // RL case
                    {
                        cout<<"\n RL case \n";
                        C=B->left;
                        rotateright(B,C,A,data);
                        rotateleft(A,C,x,data);
                    }       
                    else                //RR case
                    {
                        cout<<"\n RR case \n";
                        C=B->right;
                        rotateleft(A,B,x,data);
                    }
                    cout<<"\nA="<<A->item<<" x="<<x->item<<" B="<<B->item<<" C="<<C->item<<endl;
            }
            else
            {
                B=A->left;
                if(B->item>data)        //LL case
                {
                    cout<<"\n LL case \n";
                    C=B->left;
                    rotateright(A,B,x,data);
                }
                else                    //LR case
                {
                    cout<<"\n LR case \n";
                    C=B->right;        
                    rotateleft(B,C,A,data);
                    rotateright(A,C,x,data);
                }
            }
            cout<<"\nA="<<A->item<<" x="<<x->item<<" B="<<B->item<<" C="<<C->item<<endl;
            }
            
            cout<<endl<<"*******************"<<endl;
}

int main()
{
    avl b;
    b.insert(100);
    b.insert(70);
    b.insert(40);
    cout<<"\n insertion of 90 is going to happen\n";
    b.insert(90);
    b.insert(120);
    b.insert(110);
    b.insert(115);
    cout<<"\n\n\nbalance height of 70"<<b.getbalance(b.search(70))<<endl;
    
    b.inorder();
    return 0;
}