#include<iostream>
#include<vector>
#include<queue>
#include<set>
using namespace std;

    

   class greaterthan
   {
    public:
    bool operator()(pair<int,int> &a,pair<int,int> &b)
    {
        return a.second>b.second;
    }
   };

priority_queue<pair<int,int>,vector<pair<int,int>>,greaterthan> result;

void djkstra(int source,int no_of_station,vector<int> map[])
{
     vector<int> d(no_of_station,INT_MAX);
    priority_queue<pair<int,int>,vector<pair<int,int>>,greaterthan> pq;

    d[source]=0;
    pq.push({source,0});

    while(!pq.empty())
    {
        int node,dis;
        node=pq.top().first;
        dis=pq.top().second;

        result.push({node,dis});
        pq.pop();
        for(auto it:map[node])
        {
           // cout<<"hello" ;
            int adjnode,adjdis;
            adjnode=it;
            adjdis=1;
            if(d[adjnode]>adjdis+dis)
            {
                d[adjnode]=adjdis+dis;
                pq.push({adjnode,d[adjnode]});
            }
        }
    }

}

int main()
{

    vector<int> map[53];
    {
        map[0].push_back(1);map[1].push_back(0);
        map[1].push_back(2);map[2].push_back(1);
        map[2].push_back(3);map[3].push_back(2);
        map[3].push_back(4);map[4].push_back(3);
        //Juction in 5 and 42
        map[4].push_back(5);map[5].push_back(4);
        map[4].push_back(42);map[42].push_back(4);
        map[5].push_back(41);map[41].push_back(5);
        map[5].push_back(43);map[43].push_back(5);
        map[5].push_back(6);map[6].push_back(5);

        map[6].push_back(7);map[7].push_back(6);
        map[7].push_back(8);map[8].push_back(7);

        map[10].push_back(9);map[9].push_back(10);
        map[11].push_back(10);map[10].push_back(11);
        map[12].push_back(43);map[43].push_back(12);
        map[13].push_back(14);map[14].push_back(13);
        map[13].push_back(23);map[23].push_back(13);
        map[13].push_back(12);map[12].push_back(13);
        map[13].push_back(24);map[24].push_back(13);

        map[14].push_back(15);map[15].push_back(14);
        map[15].push_back(16);map[16].push_back(15);
        map[16].push_back(17);map[17].push_back(16);
        map[17].push_back(18);map[18].push_back(17);
        map[18].push_back(19);map[19].push_back(18);
        map[19].push_back(20);map[20].push_back(19);
        map[20].push_back(21);map[21].push_back(20);
        map[21].push_back(52);map[52].push_back(21);

        map[23].push_back(22);map[22].push_back(23);
        map[24].push_back(25);map[25].push_back(24);
        map[25].push_back(26);map[26].push_back(25);
        map[26].push_back(27);map[27].push_back(26);
        map[27].push_back(28);map[28].push_back(27);
        map[28].push_back(29);map[29].push_back(28);
        map[29].push_back(30);map[30].push_back(29);
        map[30].push_back(31);map[31].push_back(30);
        map[31].push_back(32);map[32].push_back(31);
        map[32].push_back(33);map[33].push_back(32);
        map[33].push_back(34);map[34].push_back(33);
        map[34].push_back(35);map[35].push_back(34);

        map[37].push_back(36);map[36].push_back(37);
        map[38].push_back(37);map[37].push_back(38);
        map[39].push_back(38);map[38].push_back(39);
        map[40].push_back(39);map[39].push_back(40);
        map[41].push_back(40);map[40].push_back(41);
        map[42].push_back(6);map[6].push_back(42);
        map[42].push_back(43);map[43].push_back(42);
        map[42].push_back(41);map[41].push_back(42);

        map[43].push_back(11);map[11].push_back(43);
        map[43].push_back(44);map[44].push_back(43);


        map[44].push_back(45);map[45].push_back(44);
        map[45].push_back(46);map[46].push_back(45);
        map[46].push_back(47);map[47].push_back(46);
        map[47].push_back(48);map[48].push_back(47);
        map[48].push_back(49);map[49].push_back(48);
        map[49].push_back(50);map[50].push_back(49);
        map[50].push_back(51);map[51].push_back(50);
        map[51].push_back(52);map[52].push_back(51);
    }
    string station_name[53]={
                                "Gandhi Nagar",
                                "karond",
                                "Berasia",
                                "Budhwara",
                                "Jahangirpura",
                                "Roushan pura",
                                "Kotra Sultanabad",
                                "Nehru Nagar",
                                "Shyamla Hills",
                                "Van Vihar",
                                "Jawahar Chowk",
                                "Rangmahal",
                                "Vidhan Sabha",
                                "MP Nagar",
                                "6 No Stop",
                                "Shivaji Nagar",
                                "Char imli",
                                "Bittan Market",
                                "Shahpura",
                                "Gulmohar",
                                "Akriti Eco City",
                                "Saliya",
                                "Chandbad",
                                "Ashoka Garden",
                                "Govindpura",
                                "Minal",
                                "Piplani",
                                "Ayodhya Bypass",
                                "Anand Nagar",
                                "Awadhpuri",
                                "Barkheda Pathani",
                                "Saket Nagar",
                                "AIIMS",
                                "Barkatullah University",
                                "Misrod",
                                "Ratanput",
                                "Bairagarh",
                                "Lalghati",
                                "Tajul Masjid",
                                "Hamidia Hospital",
                                "kamla Park",
                                "Polytechnic Square",
                                "Roshanpura",
                                "New Market",
                                "Mata Mandir",
                                "MANIT Square",
                                "Patrakar Colony",
                                "Chuna Bhatti",
                                "Sarvdharm",
                                "Bima kunj",
                                "Danish kunj",
                                "Nayapura",
                                "Bairagarh Chichli"

    };

    int source_station;
    cout<<"Enter source station";
    cin>>source_station;
    djkstra(source_station,53,map);

    while(!result.empty())
        {
            cout<<station_name[result.top().first]<<result.top().second<<endl;
            result.pop();
        }


   return 0;
}

