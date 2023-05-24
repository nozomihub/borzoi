/* PLEASE GOD DO NOT BUILD THIS CLASS DIRECTLY I'M BEGGING YOU USE THE BORZOIPAYLOADBUILDER PLEASE*/

export default class BorzoiPayload {
    /* Highres Fixes */
    enable_hr!: boolean
    denoising_strength!: number
    firstphase_width!: number
    firstphase_height!: number
    hr_scale!: number
    hr_upscaler!: string
    hr_second_pass_steps!: number
    hr_resize_x!: number
    hr_resize_y!: number
    /* Image Generation */
    prompt!: string
    negative_prompt!: string
    styles!: string[]
    seed!: number
    subseed!: number
    subseed_strength!: number
    seed_resize_from_w!: number
    seed_resize_from_h!: number
    sampler_name!: string
    batch_size!: number
    n_iter!: number
    steps!: number
    cfg_scale!: number
    width!: number
    height!: number
    restore_faces!: boolean
    tiling!: false
    do_not_save_samples!: boolean
    do_not_save_grid!: boolean
    eta!: number
    s_min_uncond!: number
    s_churn!: number
    s_tmax!: number
    s_tmin!: number
    s_noise!: number
    override_settings!: {} // TODO
    override_settings_restore_afterwards!: boolean
    sampler_index!: string
    script_name!: string
    send_images!: boolean
    save_images!: boolean
}