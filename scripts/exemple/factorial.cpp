#include <iostream>
using namespace std;

int nr;

int factorial(int n)
{
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
int main()
{
    cin >> nr;
    cout << factorial(nr);
    return 0;
}
