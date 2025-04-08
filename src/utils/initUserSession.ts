// utils/initUserSession.ts
import { getUserDashboard, getUserProfile } from "@/features/dashboard/actions";
import { showToast } from "@/components/HotToast";

export const initUserSession = async (token: string) => {
  try {
    const dashboardRes = await getUserDashboard(token);
    const profileRes = await getUserProfile(token);

    if (!dashboardRes.success || !profileRes.success) {
      showToast("Failed to fetch complete user data", "error");
      return null;
    }

    return {
      user: dashboardRes.data.user,
      wallet: dashboardRes.data.wallet,
      transactionHistory: dashboardRes.data.transactionHistory,
      profile_data: profileRes.data.profile_data,
      addres: profileRes.data.addres,
      user_kyc_data: profileRes.data.user_kyc_data,
    };
  } catch (error) {
    showToast(`Fetch error: ${(error as Error).message}`, "error");
    return null;
  }
};
