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




int reverse (int);
long reverseBit(long);


int main(){
    long n;
    
    cout<<"Enter any number";
    cin>>n;
    cout<<reverseBit(n);
    return 0;
}

long reverseBit(long n){
    long result=0;
    int r;
    for(int i=0;i<32;i++){
        r=n%2;
        result=result+r*pow(2,(31-i));
        n/=2;
    }
    return result;
}


long reverBitUsingbitset(long n){
      bitset<32> decimalBitset(n);
    string k=decimalBitset.to_string();
    reverse(k.begin(),k.end());
    bitset<32> resultbits(k);
    long resultdeci=resultbits.to_ulong();
    return resultdeci;
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