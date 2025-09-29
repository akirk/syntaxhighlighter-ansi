<?php
/*
Plugin Name: SyntaxHighlighter ANSI Codes Extension
Plugin URI: https://github.com/akirk/syntaxhighlighter-ansi
Description: Adds ANSI escape code highlighting support to SyntaxHighlighter Evolved plugin. Allows syntax highlighting of terminal output with ANSI color codes and formatting.
Version: 1.0.0
Author: Your Name
License: GPL2+
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Requires at least: 5.7
Tested up to: 6.7
Requires PHP: 7.0
Text Domain: syntaxhighlighter-ansi
*/

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class SyntaxHighlighter_ANSI {

    private $plugin_url;
    private $plugin_path;

    public function __construct() {
        $this->plugin_path = plugin_dir_path( __FILE__ );
        $this->plugin_url = plugin_dir_url( __FILE__ );

        add_action( 'plugins_loaded', array( $this, 'init' ) );
    }

    public function init() {
        // Check if SyntaxHighlighter Evolved is active
        if ( ! class_exists( 'SyntaxHighlighter' ) ) {
            add_action( 'admin_notices', array( $this, 'admin_notice_missing_syntaxhighlighter' ) );
            return;
        }

        // Add ANSI brush to SyntaxHighlighter
        add_filter( 'syntaxhighlighter_brushes', array( $this, 'add_ansi_brush' ) );
        add_filter( 'syntaxhighlighter_brush_names', array( $this, 'add_ansi_brush_name' ) );

        // Register and enqueue the ANSI brush script
        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_ansi_brush' ) );
        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_ansi_brush' ) );

        // Add ANSI CSS styles
        add_action( 'wp_head', array( $this, 'add_ansi_styles' ) );
        add_action( 'admin_head', array( $this, 'add_ansi_styles' ) );
    }

    public function add_ansi_brush( $brushes ) {
        $brushes['ansi'] = 'ansi';
        $brushes['ansicodes'] = 'ansi';
        $brushes['ansi-codes'] = 'ansi';
        return $brushes;
    }

    public function add_ansi_brush_name( $brush_names ) {
        $brush_names['ansi'] = __( 'ANSI Codes', 'syntaxhighlighter-ansi' );
        return $brush_names;
    }

    public function enqueue_ansi_brush() {
        wp_register_script(
            'syntaxhighlighter-brush-ansi',
            $this->plugin_url . 'js/shBrushAnsi.js',
            array( 'syntaxhighlighter-core' ),
            '1.0.0',
            true
        );
    }

    public function add_ansi_styles() {
        ?>
        <style type="text/css">
        /* ANSI Color Styles for SyntaxHighlighter */

        /* Foreground colors */
        .syntaxhighlighter .ansi-fg-black { color: #000000 !important; }
        .syntaxhighlighter .ansi-fg-red { color: #CC0000 !important; }
        .syntaxhighlighter .ansi-fg-green { color: #4E9A06 !important; }
        .syntaxhighlighter .ansi-fg-yellow { color: #C4A000 !important; }
        .syntaxhighlighter .ansi-fg-blue { color: #3465A4 !important; }
        .syntaxhighlighter .ansi-fg-magenta { color: #75507B !important; }
        .syntaxhighlighter .ansi-fg-cyan { color: #06989A !important; }
        .syntaxhighlighter .ansi-fg-white { color: #D3D7CF !important; }

        /* Bright foreground colors */
        .syntaxhighlighter .ansi-fg-bright-black { color: #555753 !important; }
        .syntaxhighlighter .ansi-fg-bright-red { color: #EF2929 !important; }
        .syntaxhighlighter .ansi-fg-bright-green { color: #8AE234 !important; }
        .syntaxhighlighter .ansi-fg-bright-yellow { color: #FCE94F !important; }
        .syntaxhighlighter .ansi-fg-bright-blue { color: #729FCF !important; }
        .syntaxhighlighter .ansi-fg-bright-magenta { color: #AD7FA8 !important; }
        .syntaxhighlighter .ansi-fg-bright-cyan { color: #34E2E2 !important; }
        .syntaxhighlighter .ansi-fg-bright-white { color: #EEEEEC !important; }

        /* Background colors */
        .syntaxhighlighter .ansi-bg-black { background-color: #000000 !important; }
        .syntaxhighlighter .ansi-bg-red { background-color: #CC0000 !important; }
        .syntaxhighlighter .ansi-bg-green { background-color: #4E9A06 !important; }
        .syntaxhighlighter .ansi-bg-yellow { background-color: #C4A000 !important; }
        .syntaxhighlighter .ansi-bg-blue { background-color: #3465A4 !important; }
        .syntaxhighlighter .ansi-bg-magenta { background-color: #75507B !important; }
        .syntaxhighlighter .ansi-bg-cyan { background-color: #06989A !important; }
        .syntaxhighlighter .ansi-bg-white { background-color: #D3D7CF !important; }

        /* Bright background colors */
        .syntaxhighlighter .ansi-bg-bright-black { background-color: #555753 !important; }
        .syntaxhighlighter .ansi-bg-bright-red { background-color: #EF2929 !important; }
        .syntaxhighlighter .ansi-bg-bright-green { background-color: #8AE234 !important; }
        .syntaxhighlighter .ansi-bg-bright-yellow { background-color: #FCE94F !important; }
        .syntaxhighlighter .ansi-bg-bright-blue { background-color: #729FCF !important; }
        .syntaxhighlighter .ansi-bg-bright-magenta { background-color: #AD7FA8 !important; }
        .syntaxhighlighter .ansi-bg-bright-cyan { background-color: #34E2E2 !important; }
        .syntaxhighlighter .ansi-bg-bright-white { background-color: #EEEEEC !important; }

        /* Text formatting */
        .syntaxhighlighter .ansi-bold { font-weight: bold !important; }
        .syntaxhighlighter .ansi-dim { opacity: 0.5 !important; }
        .syntaxhighlighter .ansi-italic { font-style: italic !important; }
        .syntaxhighlighter .ansi-underline { text-decoration: underline !important; }
        .syntaxhighlighter .ansi-blink { animation: blink 1s linear infinite; }
        .syntaxhighlighter .ansi-reverse { filter: invert(1); }
        .syntaxhighlighter .ansi-hidden { visibility: hidden !important; }
        .syntaxhighlighter .ansi-strikethrough { text-decoration: line-through !important; }

        /* Hide ANSI escape codes temporarily until JavaScript processes them */
        .syntaxhighlighter .ansi-hide { display: none !important; }

        /* ANSI reset removes all styling */
        .syntaxhighlighter .ansi-reset { color: inherit !important; background: inherit !important; font-weight: normal !important; font-style: normal !important; text-decoration: none !important; }

        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        </style>
        <?php
    }

    public function admin_notice_missing_syntaxhighlighter() {
        ?>
        <div class="notice notice-error">
            <p>
                <strong><?php esc_html_e( 'SyntaxHighlighter ANSI Codes Extension', 'syntaxhighlighter-ansi' ); ?></strong>
                <?php esc_html_e( 'requires the SyntaxHighlighter Evolved plugin to be installed and activated.', 'syntaxhighlighter-ansi' ); ?>
            </p>
        </div>
        <?php
    }
}

// Initialize the plugin
new SyntaxHighlighter_ANSI();