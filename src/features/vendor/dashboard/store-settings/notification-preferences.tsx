import { UseFormRegister } from "react-hook-form";
import { StoreSettingsFormData } from ".";

type NotificationPreferencesProps = {
    register: UseFormRegister<StoreSettingsFormData>;
};

const NOTIFICATIONS = [
    { field: "emailNotifications" as const, title: "Email notifications",  sub: "New orders, reviews and payout updates" },
    { field: "inAppNotifications" as const, title: "In-app notifications", sub: "Show alerts inside the vendor portal" },
];

const NotificationPreferences = ({ register }: NotificationPreferencesProps) => (
    <section>
        <p className="text-[10px] tracking-widest uppercase text-[#8A8278] mb-1">Notification preferences</p>
        <div className="divide-y divide-[#F0EBE1]">
            {NOTIFICATIONS.map(({ field, title, sub }) => (
                <div key={field} className="flex items-center justify-between py-3.5">
                    <div>
                        <p className="text-sm font-medium text-[#1F1B17] mb-0.5">{title}</p>
                        <p className="text-xs text-[#8A8278]">{sub}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input {...register(field)} type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-[#D4CFC9] rounded-full peer peer-checked:bg-[#B5894A] transition-colors after:content-[''] after:absolute after:top-0.75 after:left-0.75 after:bg-white after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:after:translate-x-5" />
                    </label>
                </div>
            ))}
        </div>
    </section>
);

export default NotificationPreferences;