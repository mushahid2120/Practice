// Given two numbers N and M, find the Nth root of M.
// The Nth root of a number M is defined as a number X such
// that when X is raised to the power of N, it equals M. If the Nth root is not an integer,
// return -1.

// Example 1:
// Input: N = 3, M = 27
// Output: 3
// Explanation: The cube root of 27 is equal to 3.

#include <iostream>
#include <cmath>
using namespace std;

int Optimal(int n, int m)
{
    int low = 1, high = m / n, mid = 0;
    if (m == 0)
        return 0;
    if (m == 1)
        return 1;
    while (low <= high)
    {
        mid = high + (low - high) / 2;
        long long x = mid;
        for (int i = 0; i < n-1 ; i++)
        {
            if(x>m) break;
            x *= mid;
        };
        if (x == m)
            return mid;
        if (x < m)
            low = mid + 1;
        else
            high = mid - 1;
    }
    return -1;
}

int main()
{
    int n = 9, m = 10077696;
    int result = Optimal(n, m);
    cout << result;
    return 0;
}
