#include <iostream>
#include <vector>
using namespace std;

vector<int> Optimal(vector<int> nums)
{
    int n = nums.size();
    long long ns, nss, as = 0, ass = 0, m_d, m2_d2, r;
    ns = n;
    ns *= (n + 1);
    ns /= 2;
    nss = n;
    nss *= (n + 1);
    nss *= (2 * n + 1);
    nss /= 6;
    for (int i : nums)
    {
        as += i;
        ass += (long)i * (long)i;
    }

    m_d = ns - as;
    m2_d2 = nss - ass;
    r = m2_d2 / m_d;
    int m, d;
    m = (r + m_d) / 2;
    d = m - m_d;
    return {d, m};
}
// 202006803316
int main()
{
    vector<int> nums = {4};
    vector<int> result = Optimal(nums);
    for (int i : result)
    {
        cout << i << ", ";
    }
    return 0;
}