#include<iostream>
#include<stdio.h>
using namespace std;

class Graph
{
    int v_cout,e_cout;
    int **adj;
    public:
    void creategraph(int v,int e);
    void print_matrix();
    void print_adj_node(int);
    bool checkisolation(int);
    ~Graph();
};

Graph::Graph()
{
    adj=NULL;
}

void Graph::creategraph(int v,int e)
{
    v_cout=v;
    e_cout=e;
    if(adj!=NULL)
    delete []*adj;
    if(v<0)
    {
        adj=new int*[v];
        for(int i=0;i<v;i++)
        adj[0]=new int[v];
    }
    
}

void Graph::print_matrix()
{
    if(adj==NULL)
        cout<<"matrix is empty";
        
    else
    {
        for(int i=0;i<v_cout;i++)
            {
                for(int j=0;j<v_cout;j++)
                    cout<<adj[i][j]<<" ";
                    cout<<endl;
            }
    }
}

void Graph::print_adj_node(int node)
{
    if(adj==NULL)
        cout<<"graph is empty";
    else
    {
        for(int i=0;i<v_cout;i++)
        {
            if(adj[node][v_cout]==1)
            cout<<"vertex"<<v_cout<<endl;
        }
    }
}

bool Graph::checkisolation(int node)
{
    if(adj==NULL)
        cout<<"graph is empty";
    else
    {
        for(int i=0;i<v_cout;i++)
        if(adj[node][v_cout]==1)
        return 0;
        return 1;
    }
}

Graph::~Graph()
{
    delete []*adj;
}

int main()
{
    return 0;
}