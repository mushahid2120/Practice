#include<iostream>
#define LIST_IS_EMPTY 2
#define duplicat_value_not_allowed 1
using namespace std;

struct node 
{
    node *left;
    int item;
    node *right ;
};

class bst
{
    node *root;
    void recpreorder(node *);
    void recinorder(node *);
    void recpostorder(node *);
    public:
    bst();
    bool is_empty();
    void insert(int);
    void preorder();
    void postorder();
    void inorder();
    void del(int );
    node *search(int);
    ~bst();
    bst(bst&);
    bst& operator=(bst&);
    void copyrec(node*,bst&,bst&);
};

bst::bst()
{
    root=NULL;
}

bool bst::is_empty()
{
    return root==NULL;
}

void bst::insert(int data)
{
    node *t=new node;
    t->left=t->right=NULL;
    t->item =data;
    if(is_empty())
        root=t;
    else
    {
        node *temp=root;
        while(temp)
        {
            if(data==temp->item)
                throw duplicat_value_not_allowed;
            if(data>temp->item)
                {
                    if(temp->right==NULL)
                        {
                            temp->right=t;
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
                        break;
                    }
                    else
                    temp=temp->left;
                }

        }
    }
}

void bst::preorder()
{
    recpreorder(root);
}

void bst::recpreorder(node *t)
{
    if(t)
    {
        cout<<t->item;
        recpreorder(t->left);
        recpreorder(t->right);
    }
}


void bst::inorder()
{
    recinorder(root);
}

void bst::recinorder(node *t)
{
    if(t)
    {
        recinorder(t->left);
        cout<<t->item<<" ";
        recinorder(t->right);
    }
}

void bst::postorder()
{
    recpostorder(root);
}

void bst::recpostorder(node *t)
{
    if(t)
    {
        recpostorder(t->left);
        recpostorder(t->right);
        cout<<t->item;
    }
}

void bst::del(int data)
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

bst::~bst()
{
    
    while(root)
    {
    cout<<endl;
    del(root->item);
    }
    
}

void bst::copyrec(node *t,bst &k,bst &b)
{
    if(t)
    {
        k.insert(t->item);
        b.copyrec(t->left,k,b);
        b.copyrec(t->right,k,b);
    }
}
bst::bst(bst &b)
{
    root=NULL;
    copyrec(b.root,*this,b);
}

bst& bst::operator=(bst &b)
{
    if(root!=NULL)
    {
        delete root;
        root=NULL;
    }
    copyrec(b.root,*this,b);
    return *this;
}

int main()
{
    bst b;
    b.insert(50);
    b.insert(60);
    b.insert(40);
    b.insert(10);
    b.insert(45);
    b.insert(55);
    b.insert(70);
    //b.del(60);
    //b.del(55);
    //b.del(70);
    //b.del(50);
    //b.del(40);
    //b.del(10);
    //b.del(45);
    b.inorder();
    cout<<endl;
   // b.postorder();
    cout<<endl;
    //b.preorder();
    return 0;
}