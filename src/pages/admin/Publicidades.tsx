import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, Loader2, Eye, MousePointer } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";

interface Ad {
  id: string;
  title: string;
  image_url: string;
  link_url: string | null;
  position: string;
  active: boolean;
  start_date: string | null;
  end_date: string | null;
  clicks: number;
  impressions: number;
  created_at: string;
}

const POSITIONS = [
  { value: "sidebar", label: "Barra Lateral" },
  { value: "homepage-top", label: "Página Inicial - Topo" },
  { value: "homepage-middle", label: "Página Inicial - Meio" },
  { value: "article-bottom", label: "Artigo - Rodapé" },
];

export default function Publicidades() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    link_url: "",
    position: "sidebar",
    active: true,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: ads = [], isLoading } = useQuery({
    queryKey: ["admin-ads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Ad[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (editingAd) {
        const { error } = await supabase
          .from("ads")
          .update(data)
          .eq("id", editingAd.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("ads").insert([data]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-ads"] });
      queryClient.invalidateQueries({ queryKey: ["ads"] });
      toast({
        title: editingAd ? "Publicidade atualizada" : "Publicidade criada",
        description: "As alterações foram salvas com sucesso.",
      });
      handleCloseDialog();
    },
    onError: (error) => {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("ads").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-ads"] });
      toast({
        title: "Publicidade excluída",
        description: "A publicidade foi removida com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao excluir",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, active }: { id: string; active: boolean }) => {
      const { error } = await supabase
        .from("ads")
        .update({ active })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-ads"] });
    },
  });

  const handleOpenDialog = (ad?: Ad) => {
    if (ad) {
      setEditingAd(ad);
      setFormData({
        title: ad.title,
        image_url: ad.image_url,
        link_url: ad.link_url || "",
        position: ad.position,
        active: ad.active,
      });
    } else {
      setEditingAd(null);
      setFormData({
        title: "",
        image_url: "",
        link_url: "",
        position: "sidebar",
        active: true,
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingAd(null);
    setFormData({
      title: "",
      image_url: "",
      link_url: "",
      position: "sidebar",
      active: true,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.image_url) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha o título e selecione uma imagem.",
        variant: "destructive",
      });
      return;
    }
    saveMutation.mutate(formData);
  };

  const getPositionLabel = (position: string) => {
    return POSITIONS.find((p) => p.value === position)?.label || position;
  };

  return (
    <>
      <Helmet>
        <title>Publicidades - Admin | Portal Justiça</title>
      </Helmet>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Publicidades</h1>
              <p className="text-muted-foreground">
                Gerencie os banners e anúncios do site
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Publicidade
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>
                    {editingAd ? "Editar Publicidade" : "Nova Publicidade"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, title: e.target.value }))
                      }
                      placeholder="Nome do anúncio"
                    />
                  </div>

                  <ImageUpload
                    value={formData.image_url}
                    onChange={(url) =>
                      setFormData((prev) => ({ ...prev, image_url: url }))
                    }
                    bucket="ads"
                    label="Imagem do Banner *"
                  />

                  <div className="space-y-2">
                    <Label htmlFor="link_url">URL de Destino</Label>
                    <Input
                      id="link_url"
                      value={formData.link_url}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, link_url: e.target.value }))
                      }
                      placeholder="https://exemplo.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Posição</Label>
                    <Select
                      value={formData.position}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, position: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {POSITIONS.map((pos) => (
                          <SelectItem key={pos.value} value={pos.value}>
                            {pos.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Ativo</Label>
                    <Switch
                      checked={formData.active}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, active: checked }))
                      }
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCloseDialog}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      disabled={saveMutation.isPending}
                      className="flex-1"
                    >
                      {saveMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Salvando...
                        </>
                      ) : editingAd ? (
                        "Atualizar"
                      ) : (
                        "Criar"
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Todos os Anúncios</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : ads.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhuma publicidade cadastrada.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Imagem</TableHead>
                      <TableHead>Título</TableHead>
                      <TableHead>Posição</TableHead>
                      <TableHead className="text-center">
                        <Eye className="h-4 w-4 inline mr-1" />
                        Impressões
                      </TableHead>
                      <TableHead className="text-center">
                        <MousePointer className="h-4 w-4 inline mr-1" />
                        Cliques
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ads.map((ad) => (
                      <TableRow key={ad.id}>
                        <TableCell>
                          <img
                            src={ad.image_url}
                            alt={ad.title}
                            className="w-20 h-12 object-cover rounded"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{ad.title}</TableCell>
                        <TableCell>{getPositionLabel(ad.position)}</TableCell>
                        <TableCell className="text-center">{ad.impressions}</TableCell>
                        <TableCell className="text-center">{ad.clicks}</TableCell>
                        <TableCell>
                          <Switch
                            checked={ad.active}
                            onCheckedChange={(checked) =>
                              toggleActiveMutation.mutate({ id: ad.id, active: checked })
                            }
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleOpenDialog(ad)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                if (confirm("Excluir esta publicidade?")) {
                                  deleteMutation.mutate(ad.id);
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </>
  );
}
