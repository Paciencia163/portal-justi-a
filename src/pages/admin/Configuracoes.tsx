import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { KeyRound, UserPlus, Trash2, Loader2 } from "lucide-react";

interface EditorUser {
  user_id: string;
  role: string;
  email: string;
  created_at: string;
}

export default function Configuracoes() {
  const { toast } = useToast();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  const [editorEmail, setEditorEmail] = useState("");
  const [editorPassword, setEditorPassword] = useState("");
  const [creatingEditor, setCreatingEditor] = useState(false);

  const [editors, setEditors] = useState<EditorUser[]>([]);
  const [loadingEditors, setLoadingEditors] = useState(true);

  const fetchEditors = async () => {
    setLoadingEditors(true);
    const { data, error } = await supabase.functions.invoke("manage-users", {
      body: { action: "list-editors" },
    });
    if (!error && data?.editors) {
      setEditors(data.editors);
    }
    setLoadingEditors(false);
  };

  useEffect(() => {
    fetchEditors();
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({ title: "Erro", description: "As senhas não coincidem", variant: "destructive" });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: "Erro", description: "A senha deve ter pelo menos 6 caracteres", variant: "destructive" });
      return;
    }

    setChangingPassword(true);
    const { data, error } = await supabase.functions.invoke("manage-users", {
      body: { action: "change-password", new_password: newPassword },
    });

    if (error || data?.error) {
      toast({ title: "Erro", description: data?.error || "Erro ao alterar senha", variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Senha alterada com sucesso" });
      setNewPassword("");
      setConfirmPassword("");
    }
    setChangingPassword(false);
  };

  const handleCreateEditor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editorEmail || !editorPassword) {
      toast({ title: "Erro", description: "Preencha todos os campos", variant: "destructive" });
      return;
    }

    setCreatingEditor(true);
    const { data, error } = await supabase.functions.invoke("manage-users", {
      body: { action: "create-editor", email: editorEmail, password: editorPassword },
    });

    if (error || data?.error) {
      toast({ title: "Erro", description: data?.error || "Erro ao criar editor", variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Editor criado com sucesso" });
      setEditorEmail("");
      setEditorPassword("");
      fetchEditors();
    }
    setCreatingEditor(false);
  };

  const handleDeleteEditor = async (userId: string, email: string) => {
    if (!confirm(`Tem certeza que deseja remover o usuário ${email}?`)) return;

    const { data, error } = await supabase.functions.invoke("manage-users", {
      body: { action: "delete-editor", user_id: userId },
    });

    if (error || data?.error) {
      toast({ title: "Erro", description: data?.error || "Erro ao remover usuário", variant: "destructive" });
    } else {
      toast({ title: "Sucesso", description: "Usuário removido com sucesso" });
      fetchEditors();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Configurações</h1>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Change Password */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyRound className="h-5 w-5" />
                Alterar Senha
              </CardTitle>
              <CardDescription>Atualize sua senha de acesso</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nova Senha</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Senha</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repita a nova senha"
                  />
                </div>
                <Button type="submit" disabled={changingPassword} className="w-full">
                  {changingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Alterar Senha
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Create Editor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Criar Editor
              </CardTitle>
              <CardDescription>Adicione um novo editor ao sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateEditor} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="editor-email">Email</Label>
                  <Input
                    id="editor-email"
                    type="email"
                    value={editorEmail}
                    onChange={(e) => setEditorEmail(e.target.value)}
                    placeholder="email@exemplo.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editor-password">Senha</Label>
                  <Input
                    id="editor-password"
                    type="password"
                    value={editorPassword}
                    onChange={(e) => setEditorPassword(e.target.value)}
                    placeholder="Senha do editor"
                  />
                </div>
                <Button type="submit" disabled={creatingEditor} className="w-full">
                  {creatingEditor && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Criar Editor
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Editors List */}
        <Card>
          <CardHeader>
            <CardTitle>Usuários do Sistema</CardTitle>
            <CardDescription>Lista de administradores e editores</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingEditors ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead className="w-[80px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {editors.map((editor) => (
                    <TableRow key={editor.user_id}>
                      <TableCell>{editor.email}</TableCell>
                      <TableCell>
                        <Badge variant={editor.role === "admin" ? "default" : "secondary"}>
                          {editor.role === "admin" ? "Administrador" : "Editor"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(editor.created_at).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell>
                        {editor.role !== "admin" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteEditor(editor.user_id, editor.email)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
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
  );
}
