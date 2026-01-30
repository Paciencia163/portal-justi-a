import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Ad {
  id: string;
  title: string;
  image_url: string;
  link_url: string | null;
  position: string;
}

interface AdBannerProps {
  position: "sidebar" | "homepage-top" | "homepage-middle" | "article-bottom";
  className?: string;
}

export function AdBanner({ position, className = "" }: AdBannerProps) {
  const { data: ads = [], isLoading } = useQuery({
    queryKey: ["ads", position],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ads")
        .select("id, title, image_url, link_url, position")
        .eq("position", position)
        .eq("active", true);
      
      if (error) throw error;
      return data as Ad[];
    },
  });

  const trackClick = useMutation({
    mutationFn: async (adId: string) => {
      // Increment click count directly
      const ad = ads.find(a => a.id === adId);
      if (ad) {
        await supabase
          .from("ads")
          .update({ clicks: (ad as any).clicks ? (ad as any).clicks + 1 : 1 })
          .eq("id", adId);
      }
    },
  });

  if (isLoading) {
    return (
      <div className={className}>
        <Skeleton className="w-full h-32 rounded-lg" />
      </div>
    );
  }

  if (ads.length === 0) {
    return null;
  }

  // Show first ad for this position
  const ad = ads[0];

  const handleClick = () => {
    trackClick.mutate(ad.id);
  };

  const content = (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <img
        src={ad.image_url}
        alt={ad.title}
        className="w-full h-auto object-cover"
      />
      <span className="absolute bottom-1 right-1 text-[10px] bg-black/50 text-white px-1 rounded">
        Publicidade
      </span>
    </div>
  );

  if (ad.link_url) {
    return (
      <a
        href={ad.link_url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="block hover:opacity-90 transition-opacity"
      >
        {content}
      </a>
    );
  }

  return content;
}
