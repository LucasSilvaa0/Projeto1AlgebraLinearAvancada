#include "matplotlibcpp.h"
#include <vector>

namespace plt = matplotlibcpp;

int main()
{
    std::vector<int> x = {1, 2, 3, 4};
    std::vector<int> y = {10, 20, 15, 30};

    plt::plot(x, y);
    plt::show();
}