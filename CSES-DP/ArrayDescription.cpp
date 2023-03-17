/*ॐ Arpit Blagan ॐ*/
#include<bits/stdc++.h>
using namespace std;
#define all(arr) arr.begin(),arr.end()
#define rep(i,s,e) for(int i=s;i<e;i++)
#define lli long long int
#define ll long long
const ll INF=1e18;
const int mod=1e9+7;const int N=1e5+1;

int main(){
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr); cout.tie(nullptr);
	int n,m;cin>>n>>m;
	vector<int>arr(n+1);for(int i=1;i<=n;i++){cin>>arr[i];}
	long long dp[n+2][m+2];memset(dp,0,sizeof(dp));
	for(int i=1;i<=n;i++){
		for(int ele=1;ele<=m;ele++){
			if(i==1){
				if(arr[i]==0||arr[i]==ele){
					dp[i][ele]=1;
				}
				else{dp[i][ele]=0;}
			}	
			else{
				if(arr[i]==ele||arr[i]==0){
					dp[i][ele]=(dp[i-1][ele-1]%mod+dp[i-1][ele]%mod+dp[i-1][ele+1]%mod)%mod;
				}
				else{
					dp[i][ele]=0;
				}
			}
		}
	}
	long long ans=0;for(int i=1;i<=m;i++){
		ans=(ans%mod+dp[n][i]%mod)%mod;
	}cout<<ans<<"\n";
	return 0;
}