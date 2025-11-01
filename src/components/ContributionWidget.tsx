"use client";

import { useState } from "react";
import { ethers } from "ethers";
import type { Eip1193Provider } from "ethers";
import clsx from "clsx";
import {
  MAX_CONTRIBUTION,
  MIN_CONTRIBUTION,
  PRESALE_ADDRESS,
  TOKEN_NAME,
} from "@/lib/constants";

type Status = "idle" | "pending" | "success" | "error";

declare global {
  interface Window {
    ethereum?: Eip1193Provider;
  }
}

export function ContributionWidget() {
  const [amount, setAmount] = useState("0.10");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [txHash, setTxHash] = useState("");
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const validateAmount = (value: string) => {
    const numeric = Number(value);
    if (!value || Number.isNaN(numeric)) return "请输入数字";
    if (numeric < MIN_CONTRIBUTION) return `最低 ${MIN_CONTRIBUTION} BNB`;
    if (numeric > MAX_CONTRIBUTION) return `最高 ${MAX_CONTRIBUTION} BNB`;
    return "";
  };

  const ensureWalletConnected = async (
    provider: ethers.BrowserProvider,
  ): Promise<string> => {
    const accounts = (await provider.send("eth_accounts", [])) as string[];
    if (accounts && accounts.length > 0) {
      if (walletAddress !== accounts[0]) {
        setWalletAddress(accounts[0]);
      }
      return accounts[0];
    }

    const requested = (await provider.send("eth_requestAccounts", [])) as string[];
    if (!requested || requested.length === 0) {
      throw new Error("请在钱包弹窗中授权连接后再试。");
    }

    if (walletAddress !== requested[0]) {
      setWalletAddress(requested[0]);
    }
    return requested[0];
  };

  const getFriendlyErrorMessage = (error: unknown) => {
    if (typeof error === "object" && error !== null) {
      const err = error as {
        message?: string;
        code?: number | string;
        error?: { message?: string; code?: number | string };
        info?: { error?: { message?: string; code?: number | string } };
      };

      const nested = err.error ?? err.info?.error ?? {};
      const rawMessage = (nested.message ?? err.message ?? "").toLowerCase();
      const rawCode = String(nested.code ?? err.code ?? "");

      if (rawMessage.includes("insufficient funds") || rawCode === "-32000") {
        return "余额不足：请确认钱包里有足够的 BNB，并额外预留约 0.003 BNB 作为 gas 手续费。";
      }

      if (rawMessage.includes("user rejected")) {
        return "已取消交易，稍后可重新发起认购。";
      }
    }

    return "交易失败，请重试或检查钱包网络状态。";
  };

  const connectWallet = async () => {
    const ethereum = typeof window !== "undefined" ? window.ethereum : undefined;
    if (!ethereum) {
      setStatus("error");
      setMessage("未检测到钱包，请安装 MetaMask 或使用支持 BSC 的浏览器钱包。");
      return;
    }

    try {
      setStatus("pending");
      setMessage("等待钱包授权…");

      const provider = new ethers.BrowserProvider(ethereum);
      const address = await ensureWalletConnected(provider);

      if (!address) {
        setStatus("error");
        setMessage("未获取到钱包地址，请在钱包中确认连接。");
        return;
      }
      setStatus("idle");
      setMessage("钱包已连接，可输入认购额度。");
    } catch (error: unknown) {
      setStatus("error");
      const friendly =
        typeof error === "object" && error !== null && "message" in error
          ? String((error as { message?: string }).message)
          : "连接钱包时发生错误，请重试。";
      setMessage(friendly);
    }
  };

  const handleSubmit = async () => {
    const validation = validateAmount(amount);
    if (validation) {
      setStatus("error");
      setMessage(validation);
      return;
    }

    if (!walletAddress) {
      setStatus("error");
      setMessage("请先连接钱包，再输入认购金额。");
      return;
    }

    const ethereum = typeof window !== "undefined" ? window.ethereum : undefined;
    if (!ethereum) {
      setStatus("error");
      setMessage("未检测到钱包，请安装 MetaMask 或使用支持 BSC 的浏览器钱包。");
      return;
    }

    try {
      setStatus("pending");
      setMessage("等待钱包确认…");
      setTxHash("");

      const provider = new ethers.BrowserProvider(ethereum);
      const activeAddress = await ensureWalletConnected(provider);
      const network = await provider.getNetwork();
      if (Number(network.chainId) !== 56) {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x38" }],
        });
      }

      const signer = await provider.getSigner();
      const requestedValue = ethers.parseEther(amount);
      const signerAddress = await signer.getAddress();
      if (walletAddress !== signerAddress) {
        setWalletAddress(signerAddress);
      }

      const balance = await provider.getBalance(activeAddress ?? signerAddress);
      const gasBuffer = ethers.parseEther("0.003");

      if (balance < requestedValue + gasBuffer) {
        setStatus("error");
        setMessage("余额不足：请确保钱包余额大于认购金额并额外预留约 0.003 BNB 用于 gas。");
        return;
      }

      const tx = await signer.sendTransaction({
        to: PRESALE_ADDRESS,
        value: requestedValue,
      });

      setMessage("交易已提交，等待上链…");
      setTxHash(tx.hash);
      await tx.wait();

      setStatus("success");
      setMessage("认购成功！可在 BscScan 查看交易详情。");
    } catch (error: unknown) {
      setStatus("error");
      console.error("Presale transaction failed", error);
      setMessage(getFriendlyErrorMessage(error));
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-md sm:p-8">
      <h2 className="text-xl font-semibold">立即锁定 {TOKEN_NAME} 代币</h2>
      <p className="mt-2 text-sm text-white/60">
        单笔额度：{MIN_CONTRIBUTION} - {MAX_CONTRIBUTION} BNB
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-white/60">
          {walletAddress ? (
            <span>
              已连接：<span className="font-mono text-white/80">{walletAddress.slice(0, 6)}…{walletAddress.slice(-4)}</span>
            </span>
          ) : (
            <span>请先连接支持 BSC 的钱包。</span>
          )}
        </div>
        <button
          type="button"
          onClick={connectWallet}
          className="rounded-xl border border-white/20 px-4 py-2 text-sm text-white/80 transition hover:border-white hover:text-white"
        >
          {status === "pending" ? "处理中…" : walletAddress ? "重新连接钱包" : "连接钱包"}
        </button>
      </div>

      <label className="mt-6 block text-sm text-white/70">
        认购额度（BNB）
        <input
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          type="number"
          step="0.01"
          min={MIN_CONTRIBUTION}
          max={MAX_CONTRIBUTION}
          placeholder="0.50"
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-base text-white outline-none focus:border-sky-400"
        />
      </label>

      <button
        onClick={handleSubmit}
        disabled={status === "pending"}
        className={clsx(
          "mt-6 w-full rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 py-3 text-base font-semibold transition",
          status === "pending" ? "opacity-60" : "hover:brightness-110",
        )}
      >
        {status === "pending" ? "等待确认…" : "确认认购"}
      </button>

      <div className="mt-4 text-xs text-white/60">
        预售地址：<span className="font-mono text-white">{PRESALE_ADDRESS}</span>
      </div>

      {message && (
        <div
          className={clsx(
            "mt-4 rounded-lg border px-4 py-3 text-sm",
            status === "success"
              ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-200"
              : status === "error"
              ? "border-rose-500/40 bg-rose-500/10 text-rose-200"
              : "border-sky-500/40 bg-sky-500/10 text-sky-100",
          )}
        >
          {message}
          {txHash && (
            <div className="mt-2">
              交易哈希：
              <a
                className="underline"
                target="_blank"
                rel="noreferrer"
                href={`https://bscscan.com/tx/${txHash}`}
              >
                {txHash.slice(0, 10)}…
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

