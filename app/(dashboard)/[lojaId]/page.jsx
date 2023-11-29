import { CircuitBoard, Package } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getVolumeTotal, getHidrogenio } from "@/actions/get-reservatorios";
import { getVidros } from "@/actions/get-vidros";

import Link from "next/link";

const DashboardPage = async ({ params }) => {
  const vidros = await getVidros(params.lojaId);
  const volumeTotal = await getVolumeTotal(params.lojaId);
  const hidrogenioTotal = await getHidrogenio(params.lojaId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="heading separator pb-4">
          <h2>Dashboard</h2>
          <p>Visão geral da loja</p>
        </div>
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">Tipos de Vidro</CardTitle>
              <CircuitBoard className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vidros}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">Volume Total (reservatórios)</CardTitle>
              <Package className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{volumeTotal}L</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">Volume de Hidrogênio</CardTitle>
              <Package className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{hidrogenioTotal}L</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;