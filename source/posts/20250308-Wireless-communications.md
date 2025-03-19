---
title: Wireless Communications Revision
date: 2025-03-08 01:37:20
category: EIE
tags:
  - notes
  - wireless comms
  - exam prep
description: This note was written (casually) before my final oral exam to refresh my memory. 
---

## 1. Basis of Wireless Systems (SISO, SIMO and MISO)

$$
y_k = \sqrt{E_s} h_k c_k + n_k
$$

Where:
- $E_s$: Symbol energy.
- $h_k$: Channel coefficient for the $k$-th symbol.
- $c_k$: Transmitted symbol.
- $n_k$: Additive noise.

### 1.1 Large Scale Fading

Large scale fading includes **Path loss** and **shadowing**, gives average signal power variations over large distances. Influenced by: environment / distance. 

#### Path loss

$$
\Lambda_{0|\text{dB}} = L_{0|\text{dB}} + 10\eta \log_{10} \frac{R}{R_0}
$$

- $L_0$: Deterministic path-loss to a reference distance $R_0$. 
- $R_0$: Reference distance.
- $R$: Distance between transmitter and receiver.
- $\eta$: Path-loss exponent.

#### Shadowing

The variation in signal power caused by obstacles such as buildings, trees, or terrain that block or reflect the signal. Introduces randomness, often modeled as a log-normal distribution.

Path loss + Shadowing: 

$$
\Lambda_{\text{dB}} = \Lambda_{0|\text{dB}} + S_{\text{dB}} = L_{0|\text{dB}} + 10\eta \log_{10} \frac{R}{R_0} + S_{\text{dB}}
$$

#### Received power

$$
P_{r|\text{dB}} = P_{t|\text{dB}} + K_{\text{dB}} - 10\eta \log_{10} \frac{R}{R_0} - \Lambda_{0|\text{dB}}
$$

- $P_{t|\text{dB}}$: Transmitted power in dB.
- $P_{r|\text{dB}}$: Received power in dB.
- $K_{\text{dB}}$: Constant accounting for system gains and losses.

For user $q$ in cell $i$, the wideband/long-term SINR (Signal-to-Interference-plus-Noise Ratio): 

$$
SINR_{w,q} = \frac{\Lambda_{q,i}^{-1} E_{s,i}}{\sigma_{n,q}^2 + \sum_{j \neq i} \Lambda_{q,j}^{-1} E_{s,j}}.
$$

Assuming narrowband channels and given specific Tx and Rx locations, $h_k$ is modeled as:

$$
h_k = \frac{1}{\sqrt{\Lambda_0 S}}h_k,
$$

Where:
- Path-loss $\Lambda_0$: $\Lambda_0 \propto R^\eta$, where $\eta$ is the path-loss exponent.
- adowing $S$: Lognormal random variable, $S_{\text{dB}} \sim \mathcal{N}(0, \sigma_S^2)$.
- Fading $h_k$: Caused by the combination of non-coherent multipaths. By definition of $\Lambda_0$ and $S$, $\mathbb{E}[|h|^2] = 1$.

Alternatively, $h_k = \Lambda^{-1/2} h_k$, with $\Lambda$ modeled on a logarithmic scale:

$$
\Lambda_{\text{dB}} = \Lambda_{0|\text{dB}} + S_{\text{dB}} = L_{0|\text{dB}} + 10\eta \log_{10} \frac{R}{R_0} + S_{\text{dB}}.
$$

### 1.2 Small Scale Fading (simply "Fading")

Fading gives the variation in signal strength due to multipath propagation and mobility.

#### Rayleigh Fading

PDF of signal power follows Rayleigh distribution: 

$$
p_s(s) = \frac{s}{\sigma^2} e^{-\frac{s^2}{2\sigma^2}}, \quad s \geq 0
$$

Large fading leads to difficulty in recovering signals, introduce: diversity techniques. 

### 1.3 <mark style="background-color: #FFF384;">Maximum Likelihood (ML) Detection</mark>

For an AWGN channel, if $y = \sqrt{E_s} h c + n$, where $n \sim \mathcal{N}(0, \sigma_n^2)$, the ML decision rule:

$$
\hat{c} = \arg \min_c \left\| y - \sqrt{E_s} h c \right\|^2
$$

The receiver computes distance for all possible transmitted symbols c and chooses the one that minimises the distance.

(AWGN: Additive White Gaussian Noise)

### 1.4 Diversity

- Array gain: Increase average output SNR
  $$ g_a \triangleq \frac{\bar{\rho}_{\text{out}}}{\rho} = \frac{\bar{\rho}_{\text{out}}}{\bar{\rho}}$$

- Diversity gain: Increase negative error rate slope exploiting multiple independent paths. (asymptotic slope)

  $$g_d(\rho) \triangleq -\frac{\log_2 \bar{P}}{\log_2 (\rho)}$$

- Can be implemented across multiple domains:
  - Time: coding and interleaving.
  - Frequency: equalization and multi-carrier modulations.
  - Space: multiple antennas.

### 1.5 <mark style="background-color: #FFF384;">SIMO</mark>

<div style="border-radius: 10px; border: 1px solid #ccc; padding: 5px; margin-bottom: 10px">

Received signal:

$$
\mathbf{y} = \mathbf{h} x + \mathbf{n}
$$

Where:
- $\mathbf{h}$ : Channel vector ($N_r \times 1$).
- $x$: Transmitted signal.
- $\mathbf{n}$: Noise vector ($N_r \times 1$).
- $N_r$: Number of receive antennas.
</div>

### 1.6 <mark style="background-color: #FFF384;">Receive diversity combining</mark>

- **Selection Combining**: selects one branch with the highest SNR among the $N_r$ receive signals for detection.

- **Gain Combining**: forms a linear combination of all branches $z = \mathbf{g}^T \mathbf{y}$, where $\mathbf{g} = [g_1, \ldots, g_{N_r}]$ is the combining vector.

(The following are three common gain combining methods.)

#### 1.6.1 Equal gain combining (EGC)

Combine received signals from multiple antennas with equal magnitude gains but adjust their phases to be aligned (co-phased). So, each branch signal is adjusted to have the same weight, but phase differences are corrected so the signals add constructively.

$$
z = \sum_{i=1}^{N_r} \frac{y_i}{|y_i|} \cdot y_i = \sum_{i=1}^{N_r} |y_i|
$$

#### 1.6.2 Maximal ratio combining (MRC)

Combine signals proportionally to their SNR and align their phases. The goal is to maximise the output SNR.

$$
z = \sum_{i=1}^{N_r} h_i^* y_i
$$

#### 1.6.3 Minimum mean square error combining (MMSE)

Minimises the mean square error (MSE) between the transmitted and combined signal, considering both noise and interference.

$$
\mathbf{g}_{\text{MMSE}} = \arg\min_{\mathbf{g}} \mathbb{E}\left[ |s - \mathbf{g}^T \mathbf{y}|^2 \right]
$$
$$
\mathbf{g}_{\text{MMSE}} = (\mathbf{H} \mathbf{H}^H + \sigma_n^2 \mathbf{I})^{-1} \mathbf{h}
$$

### 1.7 <mark style="background-color: #FFF384;">MISO</mark>

<div style="border-radius: 10px; border: 1px solid #ccc; padding: 5px; margin-bottom: 10px">

Received signal:
$$
y = \mathbf{h}^T \mathbf{x} + n
$$
Where:
- $\mathbf{h}$: Channel vector ($1 \times N_t$ ).
- $\mathbf{x}$: Transmitted signal vector ($N_t \times 1$).
- $N_t$: Number of transmit antennas.
</div>

#### Transmit diversity 

The transmitter may not have full knowledge of the channel. 

### 1.8 Direct Transmit diversity techniques

#### 1.8.1 <mark style="background-color: #FFF384;">Matched Beamforming</mark>

Otherwise known as *transmit MRC* or *maximum ratio transmission (MRT)*. 

Direct the transmission of signals using antenna arrays.

- **Transmit Beamforming (e.g. MRT)**:
  $$
  \mathbf{w}_k = \alpha_k \mathbf{h}_k
  $$
  where $\alpha_k$ is a power normalization constant (that maximises signal power at user $k$). 

- **Receive Beamforming**:
  combine signals at the receiver to improve SNR.

#### 1.8.2 <mark style="background-color: #FFF384;">Space-Time Coding (Alamouti scheme)</mark>

A space-time block code (STBC) for $2 \times 1$ or $2 \times N$ MISO systems providing diversity. (2 transmit antennas and 1 or more receive antennas, provides full diversity gain without increasing bandwidth or requiring feedback.)

Transmitted symbols over two antennas and two time slots:

$$
\begin{bmatrix}
x_1 & -x_2^* \\
x_2 & x_1^*
\end{bmatrix}
$$

Received signal at time $ t $:
$$
y_t = h_1 x_t + h_2 x_{t+1} + n_t
$$

Provides full diversity and simple linear decoding.

**Transmission Pattern:**

Over **2 time slots**, symbols $x_1$ and $x_2$ are transmitted as follows:

| Time Slot | Antenna 1 Transmits | Antenna 2 Transmits |
|-----------|---------------------|---------------------|
| t         | $x_1$               | $x_2$               |
| t+1       | $-x_2^*$            | $x_1^*$             |

**Received Signal (Single Receiver Antenna):**

Let $h_1$, $h_2$ be the channels from Antenna 1 and 2 to the receiver.

At time $t$:
$$
y_1 = h_1 x_1 + h_2 x_2 + n_1
$$

At time $t+1$:
$$
y_2 = -h_1 x_2^* + h_2 x_1^* + n_2
$$

Receiver forms:
$$
\tilde{y}_1 = h_1^* y_1 + h_2 y_2^* = (|h_1|^2 + |h_2|^2) x_1 + \text{noise}
$$
$$
\tilde{y}_2 = h_2^* y_1 - h_1 y_2^* = (|h_1|^2 + |h_2|^2) x_2 + \text{noise}
$$

This enables **simple linear decoding**.


#### (Indirect Transmit diversity techniques)

Exploited using SISO techniques 

- delayed by one symbol period
- phase-rotated
- FEC/interleaving ...



### 1.9 Channel capacity


#### Ergodic capacity of fast fading channels

Fast fading channels: changes rapidly, and during the time of data transmission, the signal experiences many different fading realizations.

Ergodic capacity: takes the average capacity over all possible channel states. ("On average, over time, how much data can I transmit reliably?")


#### Outage capacity (and probability) for slow fading channels

Slow fading channel: stays constant over the duration of one transmission (e.g., a data block), but changes across blocks.

Outage capacity: no averaging over many channel states in one transmission (fixed rate). If the instantaneous channel capacity is less than your fixed transmission rate, the data is lost — an outage.

<br>

## 2. Multi-Antenna Systems (MIMO)

### 2.1 <mark style="background-color: #FFF384;">MIMO</mark>

<div style="border-radius: 10px; border: 1px solid #ccc; padding: 5px; margin-bottom: 10px">

Given: 

- $\mathbf{c}_k = [c_{1,k}, \ldots, c_{N_t,k}]^T$: Transmitted symbols.
- $\mathbf{y}_k = [y_{1,k}, \ldots, y_{N_r,k}]^T$: Received symbols.

The input-output relationship at any given time instant $k$:

$$
\mathbf{y}_k = \sqrt{E_s} \mathbf{H}_k \mathbf{x}_k + \mathbf{n}_k,
$$

Where:
- $\mathbf{x}_k$: Precoded version of $\mathbf{c}_k$ that depends on the channel knowledge at the transmitter.
- $\mathbf{H}_k$: $N_r \times N_t$ MIMO channel matrix, with $\mathbf{H}_k(n,m) = h_{nm,k}$, where $h_{nm,k}$ denotes the narrowband channel between transmit antenna $m$ ($m = 1, \ldots, N_t$) and receive antenna $n$ ($n = 1, \ldots, N_r$).
- $\mathbf{n}_k = [n_{1,k}, \ldots, n_{N_r,k}]^T$: Sampled noise vector at each receive antenna.

$$
\mathbf{H}(t) =
\begin{bmatrix}
h_{11}(t) & h_{12}(t) & \cdots & h_{1N_t}(t) \\
h_{21}(t) & h_{22}(t) & \cdots & h_{2N_t}(t) \\
\vdots & \vdots & \ddots & \vdots \\
h_{N_r1}(t) & h_{N_r2}(t) & \cdots & h_{N_rN_t}(t)
\end{bmatrix}
$$

White noise in both time and spatial dimensions:

$$
\mathbb{E}[\mathbf{n}_k \mathbf{n}_l^H] = \sigma_n^2 \mathbf{I}_{N_r} \delta(k - l).
$$

Using the same channel normalization as in SISO:

$$
\mathbb{E}[\|\mathbf{H}\|_F^2] = N_t N_r,
$$

</div>

- If perfect channel knowledge at Tx (CSIT):
  - **Dominant Eigenmode Transmission**: Exploits the dominant eigenmodes of the channel for optimal performance.
  - (CSIT: Channel State Information at the Transmitter)

- If partial channel knowledge at Tx (CDIT):
  - **Space-Time Coding**: Uses $\mathbf{x}_k = \mathbf{c}_k$ to provide diversity and robustness against channel variations.
  - (CDIT: Channel Distribution Information at the Transmitter)

### 2.2 Dominant Eigenmode Transmission

Dominant Eigenmode: largest singular value of the channel matrix, represents the strongest and most reliable communication path in the MIMO system.

Strategy: Decompose the channel matrix using Singular Value Decomposition (SVD) into eigenmodes, use the channel with largest eigenmode. 

Needs accurate knowledge of the channel matrix, which may require feedback from the receiver.


### 2.3 <mark style="background-color: #FFF384;">Water Filling Algorithm</mark>

Used in power allocation over parallel channels (e.g. MIMO) to maximise channel capacity under a total power constraint.

For channel gains $\lambda_i$ and noise powers $\sigma_i^2$, the power allocated to the $i$-th channel is:

$$
P_i = \left( \mu - \frac{\sigma_i^2}{\lambda_i} \right)^+, \quad \text{where} \quad (\cdot)^+ = \max(\cdot, 0)
$$

The water level $\mu$ is chosen such that:

$$
\sum_i P_i = P_{\text{total}}
$$

#### Step by step 

Given:
  - Channel gains $\lambda_i$.
  - Noise variances $\sigma_i^2$.

Steps:
1. Compute **effective inverse SNR**:
    $$
    \eta_i = \frac{\sigma_i^2}{\lambda_i}
    $$
2. Determine **water level $\mu$** so that:
    $$
    \sum_i \left( \mu - \eta_i \right)^+ = P_{\text{total}}
    $$
    Find $\mu$ using **bisection method**.
3. Allocate power:
    $$
    P_i = \left( \mu - \eta_i \right)^+
    $$

"Allocate more power to better channels (with lower $\eta_i$)."


### 2.4 I.I.D Rayleigh Fast Fading Channels

Each element of the channel matrix $\mathbf{H} \in \mathbb{C}^{N_r \times N_t}$ is independent and identically distributed (i.i.d.) with:

$$
h_{ij} \sim \mathcal{CN}(0, 1)
$$

The ergodic capacity for i.i.d. Rayleigh fading channels is given by:

$$
C = \mathbb{E}\left[\log_2 \det\left(\mathbf{I}_{N_r} + \frac{\rho}{N_t} \mathbf{H} \mathbf{H}^H\right)\right]
$$

Where:
- $\rho$: Signal-to-noise ratio (SNR).
- $\mathbf{H}$: Channel matrix.

The diversity gain $d$ is defined as the slope of the error probability curve in the high-SNR regime:

$$
d = -\lim_{\rho \to \infty} \frac{\log P_e}{\log \rho}
$$

Where $P_e$ is the error probability.

### 2.5 <mark style="background-color: #FFF384;">Transmission Strategies (Space-Time Encoder)</mark>

Input:
- Sequence of symbols $\{x_1, x_2, \ldots\} \in S$ (e.g., QPSK, 16-QAM).

Output:
- Encoded matrix $\mathbf{X} \in \mathbb{C}^{N_t \times T}$ transmitted over $T$ time slots.

Decoding:
At the receiver, the received signals over two time slots are combined to decode $x_1$ and $x_2$ with diversity gain.

### 2.6 Maximum Likelihood (ML) Decoding

- **Objective**: Find $\hat{\mathbf{x}}$ that **minimises distance** between received and expected signals.
- **Equation**:
  $$
  \hat{\mathbf{x}} = \arg \min_{\mathbf{x} \in \mathcal{S}^{N_t}} \| \mathbf{y} - \mathbf{H} \mathbf{x} \|^2
  $$
- **Note**: Computationally intensive; checks all possible combinations of symbols.

### 2.7 Zero-Forcing (ZF) Linear Receiver

Goal: **Eliminate interference** by inverting the channel matrix.

Steps:

1. Compute pseudo-inverse of $\mathbf{H}$:
  $$
  \mathbf{H}^\dagger = (\mathbf{H}^H \mathbf{H})^{-1} \mathbf{H}^H
  $$
2. Estimate transmitted vector:
  $$
  \hat{\mathbf{x}} = \mathbf{H}^\dagger \mathbf{y}
  $$
3. Quantize each entry of $\hat{\mathbf{x}}$ to the nearest QPSK symbol.

### 2.8 Minimum Mean Square Error (MMSE) Receiver




### 2.9 Successive Interference Canceler (SIC)

Decode and subtract strongest signals sequentially.

Steps: 

1. Apply ZF to isolate strongest stream.
2. Decode symbol, subtract its contribution from $\mathbf{y}$.
3. Repeat for remaining streams.

Reduced error propagation, better than pure ZF.


<br>

## 3. Multi-User systems (MU-SIMO, MU-MISO and MU-MIMO)

#### Broadcast Channel (BC) – Downlink
- One transmitter, multiple receivers.
- Use **precoding** to manage inter-user interference.
- Techniques: ZF, MMSE, MRT.

#### Multiple Access Channel (MAC) – Uplink
- Multiple transmitters, one receiver.
- Receiver uses **multi-user detection** (MRC, ZF, SIC).

### 3.1  Two-User SISO MAC


#### Capacity region

The set of all rate pairs (R₁, R₂) both users can achieve simultaneously.

Convex shape bounded by:
  - Individual rates: $R_1 \leq C_1 $, $R_2 \leq C_2$
  - Sum-rate: $R_1 + R_2 \leq C_{\text{sum}}$

SIC is optimal to achieve corner points in the SISO MAC rate region. 

#### Compare with TDMA

TDMA: Line segment inside the MAC region (wastes potential capacity)

### 3.2 Two-User SISO BC


### 3.3 MU-SIMO MAC (Multi-User SIMO, Uplink)

$$
y_{\text{ul}} = \sum_{q=1}^{K} \Lambda_q^{-1/2} \mathbf{h}_{\text{ul},q} c_{\text{ul},q} + \mathbf{n}_{\text{ul}}
$$

Where:
- $\mathbf{h}_{\text{ul},q} \in \mathbb{C}^{n_r \times 1}$: small-scale fading.
- $\Lambda_q^{-1}$: large-scale fading (path loss, shadowing).
- $c_{\text{ul},q}$: transmit signal.
- $\mathbf{n}_{\text{ul}} \sim \mathcal{CN}(0, \sigma_n^2 \mathbf{I}_{n_r})$

### 3.4 MU-MISO BC (Multi-User MISO, Downlink)

$$
y_{\text{dl}} = \mathbf{h}_{\text{dl}}^H \mathbf{x}_{\text{dl}} + n_{\text{dl}}
$$

Where:
- $\mathbf{h}_{\text{dl}} \in \mathbb{C}^{n_t \times 1}$: Channel vector from BS to user (small-scale fading).
- $\mathbf{x}_{\text{dl}} \in \mathbb{C}^{n_t \times 1}$: Transmit signal vector (precoded signal).
- $n_{\text{dl}} \sim \mathcal{CN}(0, \sigma_n^2)$: AWGN noise at the user.
- $\mathbf{h}_{\text{dl}}^H$: Hermitian transpose (row vector).


Precoding is needed. 


### 3.6 Fairness and Scheduling 

In a SISO Broadcast Channel (BC), maximising the sum-rate often involves selecting the strongest user. However, this approach may not be fair, as weaker users may be neglected. 

The goal of the resource allocation strategy at the scheduler is to maximise a utility metric $U$:

$$
q^\star = \arg\max_{q \in \mathcal{K}} U
$$

Where $q^\star$ is the optimum user (or subset of users) to be scheduled.

#### Resource Allocation Strategies

**Rate-maximisation Policy**:
  - maximises the sum-rate.
  - No fairness among users.

**Fairness-Oriented Policy**:
  - Relies on a proportional fair (PF) metric.
  - maximises a weighted sum-rate and guarantees fairness among users.

The two strategies can be addressed using different utility metrics:

$$
q^\star = \arg\max_{q \in \mathcal{K}} w_q R_q
$$

Where:
- Rate-maximisation: $w_q = 1$
- Proportional Fair: $w_q = \frac{\gamma_q}{\bar{R}_q}$
- $\bar{R}_q$: Long-term average rate of user $q$.
- $\gamma_q$: Quality of Service (QoS) requirement of user $q$.
- $R_q$: Instantaneous rate of user $q$.


### 3.7 <mark style="background-color: #FFF384;">Precoding</mark>

Precoding is **pre-processing at the transmitter** using **CSIT** to manage interference or boost desired signal strength.


- **MRT (Maximal Ratio Transmission)**: Aligns with user’s channel.
  $$
  \mathbf{w}_k = \alpha_k \mathbf{h}_k, \quad \alpha_k = \sqrt{P_k} / \| \mathbf{h}_k \|
  $$
- **ZF Precoding**: Nulls interference to other users.
  $$
  \mathbf{W}_{\text{ZF}} = \mathbf{H}^H (\mathbf{H} \mathbf{H}^H)^{-1}
  $$
  Then normalize each column for power.

- **MMSE Precoding**:
  $$
  \mathbf{W}_{\text{MMSE}} = \mathbf{H}^H (\mathbf{H} \mathbf{H}^H + \sigma^2 \mathbf{I})^{-1}
  $$



### 3.8 Zero-Forcing Beamforming (ZFBF)

Goal: Eliminate inter-user interference in downlink.

Given: User channel vectors $\mathbf{h}_1, \ldots, \mathbf{h}_K$, stacked into matrix $\mathbf{H} = [\mathbf{h}_1, \ldots, \mathbf{h}_K]^H$.

ZF Precoder:

$$
\mathbf{W}_{\text{ZF}} = \mathbf{H}^H (\mathbf{H} \mathbf{H}^H)^{-1}
$$

Power Normalization: Each column of $ \mathbf{W}_{\text{ZF}} $ scaled to meet power constraint.


### 3.9 Massive MIMO

#### Matched Beamforming (MBF)

Aligns the precoder of user $q$ to its channel, eliminate multi-user interference as the number of transmit antennas $N_t$ increases.

- **Spectral and Energy Efficiency**:
  - Assume a single receive antenna for simplicity.
  - Transmit with an MBF/MRT precoder:
    $$
    \mathbf{w}_p = \frac{\mathbf{h}_p^H}{\|\mathbf{h}_p\|}, \quad \text{and transmit power} \; s_p = \frac{E_s}{N_t}, \; \forall p = 1, \ldots, K.
    $$
  - For large $N_t$, the SINR $\rho_q$ of user $q$ simplifies as:
    $$
    \rho_q = \frac{\Lambda_q^{-1} |\mathbf{h}_q \mathbf{w}_q|^2 E_s / N_t}{\sum_{p \neq q} \Lambda_q^{-1} |\mathbf{h}_q \mathbf{w}_p|^2 E_s / N_t + \sigma_{n,q}^2}.
    $$
    As $N_t \to \infty$:
    $$
    \rho_q \approx \frac{\Lambda_q^{-1} \|\mathbf{h}_q\|^2 E_s / N_t}{\sigma_{n,q}^2}.
    $$

- **Sum-Rate**:
  $$
  C_{\text{BF}}(H) \approx \sum_{q=1}^K \log_2(1 + \eta_q),
  $$
  where $\eta_q = \frac{E_s}{\sigma_{n,q}^2}$.

- **Key Observations**:
  - By MBF with power $E_s / N_t$ per user in a large MISO system, each of the $K$ users achieves the same rate as if scheduled on a SISO AWGN channel with transmit power $E_s$ and received SNR $\eta_q$, without intra-cell interference or fading.
  - Assuming $\eta_q = \eta \; \forall q$, the total achievable sum-rate is $K$ times the SISO AWGN rate.
  - The transmit power is scaled down proportionally to $1 / N_t$, while the multiplexing gain increases proportionally to $K$.

#### Zero-Forcing Beamforming (ZFBF)

ZFBF precoding eliminates inter-user interference by nulling the interference at unintended receivers.

- **Precoding Vector**:
  $$
  \mathbf{w}_q = \frac{\mathbf{F}(:,q)}{\|\mathbf{F}(:,q)\|}, \quad \text{where} \; \mathbf{F} = \mathbf{H}^H (\mathbf{H} \mathbf{H}^H)^{-1}.
  $$

- **Massive MIMO Effect**:
  - As $N_t$ grows, $\mathbf{H} \mathbf{H}^H$ becomes better conditioned, simplifying the computation of the matrix inverse.
  - In the limit where user channels are orthogonal, $\mathbf{H} \mathbf{H}^H$ becomes diagonal, and ZFBF reduces to MBF.
  - The diagonalization of $\mathbf{H} \mathbf{H}^H$ in the large $N_t$ regime ensures efficient interference management.

(Sum-rate evaluation of both methods)


### 3.10 Multiuser Multicell Communication

#### Long-Term SINR

Long-term SINR accounts for averaged interference and noise over time and fading realizations:

$$
\text{SINR}_k^{\text{LT}} = \mathbb{E}\left[ \frac{|h_k^H w_k|^2}{\sum_{j \neq k} |h_k^H w_j|^2 + \sigma_k^2} \right]
$$

#### Linear Precoding

Transmit $n_{e,i}$ streams in each cell $i$ using MU-MIMO linear precoding:

$$
\mathbf{c}'_i = \mathbf{P}_i \mathbf{c}_i = \mathbf{W}_i \mathbf{S}_i^{1/2} \mathbf{c}_i
$$

The received signal $\mathbf{y}_q \in \mathbb{C}^{n_{r,q}}$ of user $q \in \mathcal{K}_i$ is:

$$
\mathbf{y}_q = \Lambda_{q,i}^{-1/2} \mathbf{H}_{q,i} \mathbf{P}_{q,i} \mathbf{c}_{q,i}
+ \sum_{p \in \mathcal{K}_i, p \neq q} \Lambda_{q,i}^{-1/2} \mathbf{H}_{q,i} \mathbf{P}_{p,i} \mathbf{c}_{p,i}
+ \sum_{j \neq i} \sum_{l \in \mathcal{K}_j} \Lambda_{q,j}^{-1/2} \mathbf{H}_{q,j} \mathbf{P}_{l,j} \mathbf{c}_{l,j}
+ \mathbf{n}_q.
$$

Apply a receive combiner to stream $l$ of user $q$ in cell $i$:

$$
z_{q,l} = \mathbf{g}_{q,l}^H \mathbf{y}_q
= \Lambda_{q,i}^{-1/2} \mathbf{g}_{q,l}^H \mathbf{H}_{q,i} \mathbf{p}_{q,i,l} c_{q,i,l}
+ \sum_{m \neq l} \Lambda_{q,i}^{-1/2} \mathbf{g}_{q,l}^H \mathbf{H}_{q,i} \mathbf{p}_{q,i,m} c_{q,i,m}
+ \sum_{p \in \mathcal{K}_i, p \neq q} \Lambda_{q,i}^{-1/2} \mathbf{g}_{q,l}^H \mathbf{H}_{q,i} \mathbf{P}_{p,i} \mathbf{c}_{p,i}
+ \sum_{j \neq i} \sum_{l \in \mathcal{K}_j} \Lambda_{q,j}^{-1/2} \mathbf{g}_{q,l}^H \mathbf{H}_{q,j} \mathbf{P}_{l,j} \mathbf{c}_{l,j}
+ \mathbf{g}_{q,l}^H \mathbf{n}_q.
$$

Where:
- $\Lambda_{q,i}^{-1/2} \mathbf{g}_{q,l}^H \mathbf{H}_{q,i} \mathbf{p}_{q,i,l} c_{q,i,l}$: Desired signal.
- $\sum_{m \neq l} \Lambda_{q,i}^{-1/2} \mathbf{g}_{q,l}^H \mathbf{H}_{q,i} \mathbf{p}_{q,i,m} c_{q,i,m}$: Inter-stream interference.
- $\sum_{p \in \mathcal{K}_i, p \neq q} \Lambda_{q,i}^{-1/2} \mathbf{g}_{q,l}^H \mathbf{H}_{q,i} \mathbf{P}_{p,i} \mathbf{c}_{p,i}$: Intra-cell (multi-user) interference.
- $\sum_{j \neq i} \sum_{l \in \mathcal{K}_j} \Lambda_{q,j}^{-1/2} \mathbf{g}_{q,l}^H \mathbf{H}_{q,j} \mathbf{P}_{l,j} \mathbf{c}_{l,j}$: Inter-cell interference.
- $\mathbf{g}_{q,l}^H \mathbf{n}_q$: Noise.


#### Achievable rate

By treating all interference as noise, the maximum rate achievable by user $q$ in cell $i$ with linear precoding is:

$$
R_{q,i} = \sum_{l=1}^{n_{u,q}} \log_2 (1 + \rho_{q,l}).
$$

The quantity $\rho_{q,l}$ denotes the SINR experienced by stream $l$ of user-$q$ and is expressed as:

$$
\rho_{q,l} = \frac{S}{I_l + I_c + I_o + \|\mathbf{g}_{q,l}\|^2 \sigma_{n,q}^2}.
$$

Where:
- $S$: Received signal power of the intended stream.
- $I_l$: Inter-stream interference.
- $I_c$: Intra-cell interference (interference from co-scheduled users).
- $I_o$: Inter-cell interference.

- **Signal power**:
  $$
  S = \Lambda_{q,i}^{-1} |\mathbf{g}_{q,l}^H \mathbf{H}_{q,i} \mathbf{p}_{q,i,l}|^2,
  $$

- **Inter-stream interference**:
  $$
  I_l = \sum_{m \neq l} \Lambda_{q,i}^{-1} |\mathbf{g}_{q,l}^H \mathbf{H}_{q,i} \mathbf{p}_{q,i,m}|^2,
  $$

- **Intra-cell interference**:
  $$
  I_c = \sum_{p \in \mathcal{K}_i, p \neq q} \Lambda_{q,i}^{-1} |\mathbf{g}_{q,l}^H \mathbf{H}_{q,i} \mathbf{P}_{p,i}|^2,
  $$

- **Inter-cell interference**:
  $$
  I_o = \sum_{j \neq i} \|\mathbf{g}_{q,l}^H \mathbf{H}_{q,j} \mathbf{P}_j\|^2.
  $$




<br>

## 4. Convex Optimisation

### 4.0 Fundamental Concepts

$$
\min_{x} f(x) \quad \text{s.t.} \; x \in \mathcal{X}
$$

where $f(x)$ is the objective function and $\mathcal{X}$ is the feasible set.

In wireless systems, problems are often non-convex (e.g., due to SINR constraints), but can sometimes be converted to convex problems via approximations, relaxations, or reformulations.

Convex Set: A set $\mathcal{C}$ is convex if for any $x_1, x_2 \in \mathcal{C}$ and $\theta \in [0,1]$, we have:

$$
\theta x_1 + (1-\theta)x_2 \in \mathcal{C}
$$

Convex Function: A function $f$ is convex if:

$$
f(\theta x_1 + (1-\theta)x_2) \leq \theta f(x_1) + (1-\theta)f(x_2), \quad \forall x_1,x_2,\theta \in [0,1]
$$

Convex problem

####  4.0.1 <mark style="background-color: #FFF384;">Linear Programming (LP)</mark>

A **linear program** is a convex optimization problem with linear objective and constraints:

$$
\min_x \; c^\top x \quad \text{s.t.} \; Ax \leq b
$$

- Solved efficiently using **Simplex** or **Interior Point Methods**.
- Applications: resource allocation, scheduling.

#### 4.0.2 <mark style="background-color: #FFF384;">Quadratically Constrained Quadratic Program (QCQP)</mark>

**Quadratic programming (QP) problem**
$$\min_x \; \frac{1}{2} x^\top Px + q^\top x + r$$
$$\text{s.t.} \; Gx \preceq h, Ax = b$$

- Convex if $P \succeq 0$ (positive semidefinite).

**Quadratically Constrained Quadratic Program (QCQP)**:

$$
\min_x \; \frac{1}{2}x^\top P_0 x + q_0^\top x + r_0 \quad \text{s.t.} \; \frac{1}{2}x^\top P_i x + q_i^\top x + r_i \leq 0, \; \forall i
$$

- Convex if $P_i \succeq 0 \; \forall i$.

#### 4.0.3 <mark style="background-color: #FFF384;">Semi-Definite Programming (SDP)</mark>

An SDP is a generalization of LP/QP with **matrix variables** subject to **positive semidefinite constraints**.

Standard form:

$$
\min_X \; \mathrm{Tr}(CX) \quad \text{s.t.} \; \mathrm{Tr}(A_i X) = b_i, \; X \succeq 0
$$

- **X** is a matrix variable.
- Used in **beamforming**, **power control**, **network design**.


#### 4.0.4 <mark style="background-color: #FFF384;">Semi-Definite Relaxation (SDR)</mark>

**SDR** relaxes a **non-convex QCQP** into an SDP by:

1. Lifting vector $x$ to matrix $X = xx^\top$.
2. Dropping rank-1 constraint $\text{rank}(X) = 1$.

Relaxed problem:

$$
\min_X \; \mathrm{Tr}(PX) \quad \text{s.t.} \; \mathrm{Tr}(A_i X) \leq b_i, \; X \succeq 0
$$

After solving, **approximate** solution $x$ from **randomization** or **eigenvalue decomposition**.

#### 4.0.5 <mark style="background-color: #FFF384;">Geometric Programming (GP)</mark>

**GP** solves problems with **posynomial objectives** and constraints.

Standard form:

$$
\min_x \; f_0(x) \quad \text{s.t.} \; f_i(x) \leq 1, \; h_j(x) = 1
$$

Where:

- $f_i(x)$ are **posynomials**: sum of monomials.
- **Transform to convex form** using **log-log transformation**: $y_i = \log x_i, \; \log f_i(x) \rightarrow \text{convex}$.

Applications: **power control**, **rate optimization**, **energy efficiency**.

#### 4.0.6 <mark style="background-color: #FFF384;">Lagrangian Duality and Karush-Kuhn-Ticker (KKT) Conditions</mark>

Given problem:

$$
\min_x \; f(x) \quad \text{s.t.} \; g_i(x) \leq 0, \; h_j(x) = 0
$$

**Lagrangian**:

$$
\mathcal{L}(x,\lambda,\nu) = f(x) + \sum_i \lambda_i g_i(x) + \sum_j \nu_j h_j(x)
$$

- $\lambda_i \geq 0$: Lagrange multipliers for inequality constraints.
- $\nu_j$: multipliers for equality constraints.

**Dual function**:

$$
d(\lambda, \nu) = \inf_x \mathcal{L}(x, \lambda, \nu)
$$

**Dual problem**:

$$
\max_{\lambda \geq 0, \nu} d(\lambda, \nu)
$$

- Strong Duality holds for convex problems with Slater’s condition.

**Karush-Kuhn-Ticker (KKT) Conditions**

Necessary (and for convex problems, sufficient) conditions for optimality:

1. **Primal feasibility**: $g_i(x^*) \leq 0, \; h_j(x^*) = 0$
2. **Dual feasibility**: $\lambda_i^* \geq 0$
3. **Complementary slackness**: $\lambda_i^* g_i(x^*) = 0$
4. **Stationarity**: $\nabla f(x^*) + \sum_i \lambda_i^* \nabla g_i(x^*) + \sum_j \nu_j^* \nabla h_j(x^*) = 0$

Used to derive optimal solutions analytically or validate numerical solutions.

### 4.1 Power Minimisation

$$
\min_{w_1, \ldots, w_K} \sum_{k=1}^{K} \|w_k\|^2
$$

$$
\text{s.t.} \; \frac{|h_k^H w_k|^2}{\sum_{j \neq k} |h_k^H w_j|^2 + \sigma_k^2} \geq \gamma_k, \quad \forall k
$$

### 4.2 Rate Maximisation

$$
\max_{w_1, \ldots, w_K} \sum_{k=1}^{K} \log_2 \left( 1 + \frac{|h_k^H w_k|^2}{\sum_{j \neq k} |h_k^H w_j|^2 + \sigma_k^2} \right)
$$
$$
\text{s.t.} \; \sum_{k=1}^{K} \|w_k\|^2 \leq P
$$

**Beamforming Techniques**:
- **ZF (Zero-Forcing)**: Eliminates interference, simplifies SINR.
- **WF (Water-Filling)**: Optimal power allocation over eigenmodes.
- **MMSE (Minimum Mean Square Error)**: Balances interference and noise.
- **MRT (Maximum Ratio Transmission)**: maximises signal strength per user.

### 4.3 Beamforming Design for RIS

**RIS**: Reconfigurable Intelligent Surface adjusts phase shifts to enhance signal.

Joint optimization of $\{w_k\}$ and $\Theta$ via alternating optimization or semidefinite relaxation (SDR).

$$
\min_{w_1, \ldots, w_K, \Theta} \sum_{k=1}^{K} \|w_k\|^2
$$

$$
\text{s.t.} \; \frac{|(h_{d,k}^H + h_{r,k}^H \Theta G) w_k|^2}{\sum_{j \neq k} |(h_{d,k}^H + h_{r,k}^H \Theta G) w_j|^2 + \sigma_k^2} \geq \gamma_k, \quad \forall k
$$

$$
\Theta = \text{diag}(\theta_1, \ldots, \theta_M), \quad |\theta_m| = 1, \quad \forall m
$$




<br>

---
## References

- [Prof. Bruno Clerckx's Youtube channel](https://www.youtube.com/@prof.brunoclerckx1530/videos)
- [Wireless communications playlist](https://www.youtube.com/playlist?list=PL3nE1Yo1b4CrAfN3lndrMImPFuS1hR5U-)
- [Lectures notes (open access)](http://www.ee.ic.ac.uk/bruno.clerckx/Teaching.html)
- [D. Tse and P. Viswanath, “Fundamentals of Wireless Communication”](https://library-search.imperial.ac.uk/permalink/44IMP_INST/mek6kh/alma9910454174401591)
- [B. Clerckx and C. Oestges, “MIMO Wireless Networks: Channels, Techniques and Standards for Multi Antenna, Multi-User and Multi-Cell Systems” ](https://library-search.imperial.ac.uk/permalink/44IMP_INST/mek6kh/alma9910564174401591)
- [S. Boyd and L. Vandenberghe, “Convex Optimization”](https://library-search.imperial.ac.uk/permalink/44IMP_INST/fv0fdm/cdi_elsevier_sciencedirect_doi_10_1016_j_ejor_2005_02_002)
- [CVX MATLAB](https://cvxr.com/cvx/doc/)

