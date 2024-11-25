#include <stdio.h>
#include <stdlib.h>
void main()
{
    int noOfReq, head;
    printf("Enter the no if req : ");
    scanf("%d", &noOfReq);
    printf("Enter the Head: ");
    scanf("%d", &head);

    int requests[noOfReq];

    for (int i = 0; i < noOfReq; i++)
    {
        scanf("%d", &requests[i]);
    }

    for (int i = 0; i < noOfReq - 1; i++)
    {
        for (int j = 0; j < noOfReq - i - 1; j++)
        {
            if (requests[j] > requests[j + 1])
            {
                int temp = requests[j];
                requests[j] = requests[j + 1];
                requests[j + 1] = temp;
            }
        }
    }

    int pos;
    for (int i = 0; i < noOfReq; i++)
    {
        if (requests[i] < head && requests[i + 1] > head)
        {
            pos = i;
            break;
        }
    }

    int seekTime = 0;
    printf("%d ", head);
    int temp = head;

    for (int i = pos; i >= 0; i--)
    {
        seekTime += abs(requests[i] - temp);
        printf("%d ", requests[i]);
        temp = requests[i];
    }

    printf("0 ");
    seekTime += abs(temp - 0);
    temp = 0;

    for (int i = pos + 1; i < noOfReq; i++)
    {
        seekTime += abs(requests[i] - temp);
        printf("%d ", requests[i]);
        temp = requests[i];
    }

    printf("\n%d is the total seek time", seekTime);
}