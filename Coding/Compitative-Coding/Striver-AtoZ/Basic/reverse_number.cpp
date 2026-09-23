/*
Sample Input 1 :
2
0
12
Sample Output 1:
 0
 805306368
Explanation For Sample Input 1 :
For the first test case :
Since the given number N = 0 is represented as 00000000000000000000000000000000 in its binary representation. So after reversing the bits, it will become 00000000000000000000000000000000 which is equal to 0 only. So the output is 0.     



For the second test case :
Since the given number N = 12 is represented as 00000000000000000000000000001100 in its binary representation. So after reversing the bits, it will become 0110000000000000000000000000000, which is equal to 805306368 only. So the output is 805306368.
Sample Input 2 :
2
6
4
Sample Output 2 :
 1610612736
 536870912
Explanation For Sample Input 1 :
For the first test case :
Since the given number N = 6 is represented as 00000000000000000000000000000110 in its binary representation. So after reversing the bits, it will become 01100000000000000000000000000000, which is equal to 1610612736.


For the second test case :
Since the given number N = 4 is represented as 00000000000000000000000000000100 in its binary representation. So after reversing the bits, it will become 0010000000000000000000000000000, which is equal to 536870912 only.
Expected time complexity:
The expected time complexity is O(log(n)).
Constraints :
1 <= T <= 10
0 <= N <= 2^32

Time Limit: 1 sec
*/


#include <iostream>
#include <bitset>
#include <algorithm>
#include <string>
#include <math.h>
using namespace std;


string get_bit(long);
int reverse_get(int);

int main(){
    long n;
    
    cout<<"Enter any number";
    cin>>n;
    // bitset<32> decimalBitset(n);
    // string k=decimalBitset.to_string();
    // reverse(k.begin(),k.end());
    // bitset<32> resultbits(k);
    // long resultdeci=resultbits.to_ulong();
    // cout<<resultdeci;
    
    
    // cout<<get_bit(n);
    cout<<reverse_get(1534236469);
    // cout<<int(pow(-2,31));
}

string get_bit(long n){
        string result;
        for (int i=0;i<32;i++){
            long rem;
            if(n>0)
                {
                rem=n%2;
                n=n/2;
                }
            else
                rem=0;

            string cr=to_string(rem);
            result=result+cr;
        }
        return result;
    }  

int reverse(int x) {
        if(x>pow(-2,31) && x<(pow(2,31)-1)){
        if(x>0){
            string num_string=to_string(x);
            std::reverse(num_string.begin(),num_string.end());
            long long result=stol(num_string);
            if((result)>pow(-2,31) && result<(pow(2,31)-1))
                return((int)result);
            else
                return 0;
        }
        else{
            x=x*(-1);
            string num_string=to_string(x);
            std::reverse(num_string.begin(),num_string.end());
            long long result=stol(num_string);
            
            if(result>pow(-2,31) && result<(pow(2,31)-1))
                return((int)(-1)*result);
            else
                return 0;
        }
    }
    else
    return 0;
}