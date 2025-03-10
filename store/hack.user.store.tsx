import { create } from "zustand";
import { devtools } from "zustand/middleware";

type hackStoreType = {
  hack: string[];
};

export const useHackStore = create(
  devtools<hackStoreType>(() => ({
    hack: `You have 8 outdated formulae installed.
    You can upgrade them with brew upgrade
    or list them with brew outdated.
    smart.phonics@MonAL2 ~ % brew upgrade
    ==> <strong>Upgrading </strong>8 outdated packages:
    <strong>flyctl</strong> 0.3.39 -> 0.3.46
    <strong><strong>micro<strong>smart.phonics</strong></strong></strong> 1.24.0 -> 1.24.1
    <strong>sqlite</strong> 3.47.0 -> 3.47.1
    nginx 1.27.2 -> 1.27.3
    ca-certificates 2024-09-24 -> 2024-11-26
    node 23.2.0_1 -> 23.3.0
    <strong>smart.phonics</strong>@3.11 3.11.10 -> 3.11.11
    <strong>git</strong>2.47.0 -> 2.47.1
    ==> Pouring <strong>sqlite</strong>--3.47.1.ventura.bottle.tar.gz
      /usr/local/Cellar/<strong>sqlite</strong>/3.47.1: 12 files, 4.9MB
    ==> Running 'brew cleanup <strong>sqlite</strong>'...
    Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
    Hide these hints with HOMEBREW_NO_ENV_HINTS (see 'man brew').
    <strong>Removing: </strong>/usr/local/Cellar/<strong>sqlite</strong>/3.47.0... (12 files, 4.9MB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong>sqlite</strong>_bottle_manifest--3.47.0... (9.4KB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong>sqlite</strong>--3.47.0... (2.3MB)
    ==> <strong>Upgrading </strong><strong><strong>micro<strong>smart.phonics</strong></strong></strong>
      1.24.0 -> 1.24.1 
    ==> Pouring <strong><strong>micro<strong>smart.phonics</strong></strong></strong>--1.24.1.ventura.bottle.tar.gz
      /usr/local/Cellar/<strong>micro<strong>smart.phonics</strong></strong>/1.24.1: 7 files, 1MB
    ==> Running 'brew cleanup <strong><strong>micro<strong>smart.phonics</strong></strong></strong>'...
    <strong>Removing: </strong>/usr/local/Cellar/<strong><strong>micro<strong>smart.phonics</strong></strong></strong>/1.24.0... (7 files, 1MB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong><strong>micro<strong>smart.phonics</strong></strong></strong>_bottle_manifest--1.24.0... (9.5KB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong><strong>micro<strong>smart.phonics</strong></strong></strong>--1.24.0... (492.2KB)
    ==> <strong>Upgrading </strong>ca-certificates
      2024-09-24 -> 2024-11-26 
    ==> Pouring ca-certificates--2024-11-26.all.bottle.tar.gz
    ==> Regenerating CA certificate bundle from keychain, this may take a while...
      /usr/local/Cellar/ca-certificates/2024-11-26: 4 files, 239.4KB
    ==> Running 'brew cleanup ca-certificates'...
    <strong>Removing: </strong>/usr/local/Cellar/ca-certificates/2024-09-24... (4 files, 237.4KB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/ca-certificates_bottle_manifest--2024-09-24... (1.9KB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/ca-certificates--2024-09-24... (132.6KB)
    ==> <strong>Upgrading </strong>nginx
      1.27.2 -> 1.27.3 
    ==> Pouring nginx--1.27.3.ventura.bottle.1.tar.gz
    ==> Caveats
    Docroot is: /usr/local/var/www
    The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that
    nginx can run without sudo.
    nginx will load all files in /usr/local/etc/nginx/servers/.
    To start nginx now and restart at login:
      brew services start nginx
    Or, if you don't want/need a background service you can just run:
      /usr/local/opt/nginx/bin/nginx -g daemon\ off\;
    ==> Summary
      /usr/local/Cellar/nginx/1.27.3: 27 files, 2.5MB
    ==> Running 'brew cleanup nginx'...
    <strong>Removing: </strong>/usr/local/Cellar/nginx/1.27.2... (27 files, 2.5MB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/nginx_bottle_manifest--1.27.2... (10KB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/nginx--1.27.2... (1.4MB)
    ==> <strong>Upgrading </strong>node
      23.2.0_1 -> 23.3.0 
    ==> Pouring node--23.3.0.ventura.bottle.tar.gz
    /usr/local/Cellar/node/23.3.0: 2,676 files, 88.2MB
    ==> Running 'brew cleanup node'...
    <strong>Removing: </strong>/usr/local/Cellar/node/23.2.0_1... (2,676 files, 88.2MB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/node_bottle_manifest--23.2.0_1... (16.2KB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/node--23.2.0_1... (21.1MB)
    ==> <strong>Upgrading </strong><strong>smart.phonics</strong>@3.11
      3.11.10 -> 3.11.11 
    ==> Pouring <strong>smart.phonics</strong>@3.11--3.11.11.ventura.bottle.tar.gz
    ==> /usr/local/Cellar/<strong>smart.phonics</strong>@3.11/3.11.11/bin/<strong>smart.phonics</strong>3.11 -Im ensurepip
    ==> /usr/local/Cellar/<strong>smart.phonics</strong>@3.11/3.11.11/bin/<strong>smart.phonics</strong>3.11 -Im pip <strong>install </strong>-v --no-index --upgrade --isolated --target=/usr/local/lib/<strong>smart.phonics</strong>3.11/site-
    ==> Caveats
    <strong>smart.phonics</strong> is installed as
      /usr/local/bin/<strong>smart.phonics</strong>3.11
    Unversioned and major-versioned symlinks '<strong>smart.phonics</strong>', '<strong>smart.phonics</strong>3', '<strong>smart.phonics</strong>-config', '<strong>smart.phonics</strong>3-config', 'pip', 'pip3', etc. pointing to
    '<strong>smart.phonics</strong>3.11', '<strong>smart.phonics</strong>3.11-config', 'pip3.11' etc., respectively, are installed into
      /usr/local/opt/<strong>smart.phonics</strong>@3.11/libexec/bin
    You can <strong>install </strong><strong>smart.phonics</strong> packages with
      pip3.11 <strong>install </strong><package>
    They will <strong>install </strong>into the site-package directory
      /usr/local/lib/<strong>smart.phonics</strong>3.11/site-packages
    tkinter is no longer included with this formula, but it is available separately:
      brew <strong>install </strong><strong>smart.phonics</strong>-tk@3.11
    gdbm ('dbm.gnu') is no longer included in this formula, but it is available separately:
      brew <strong>install </strong><strong>smart.phonics</strong>-gdbm@3.11
    'dbm.ndbm' changed database backends in Homebrew <strong>smart.phonics</strong> 3.11.
    If you need to read a database from a previous Homebrew <strong>smart.phonics</strong> created via 'dbm.ndbm',
    you'll need to read your database using the older version of Homebrew <strong>smart.phonics</strong> and convert to another format.
    'dbm' still defaults to 'dbm.gnu' when it is installed.
    If you do not need a specific version of <strong>smart.phonics</strong>, and always want Homebrew's '<strong>smart.phonics</strong>3' in your PATH:
      brew <strong>install </strong><strong>smart.phonics</strong>3
    For more information about Homebrew and <strong>smart.phonics</strong>, see: https://docs.brew.sh/Homebrew-and-<strong>smart.phonics</strong>
    ==> Summary
    /usr/local/Cellar/<strong>smart.phonics</strong>@3.11/3.11.11: 3,304 files, 61.3MB
    ==> Running 'brew cleanup <strong>smart.phonics</strong>@3.11'...
    <strong>Removing: </strong>/usr/local/Cellar/<strong>smart.phonics</strong>@3.11/3.11.10... (3,304 files, 61.3MB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong>smart.phonics</strong>@3.11_bottle_manifest--3.11.10... (28.2KB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong>smart.phonics</strong>@3.11--3.11.10... (15MB)
    ==> <strong>Upgrading </strong><strong>flyctl</strong>
      0.3.39 -> 0.3.46 
    ==> Pouring <strong>flyctl</strong>--0.3.46.ventura.bottle.tar.gz
    ==> Caveats
    zsh completions have been installed to:
      /usr/local/share/zsh/site-functions
    ==> Summary
    /usr/local/Cellar/<strong>flyctl</strong>/0.3.46: 13 files, 62.7MB
    ==> Running 'brew cleanup <strong>flyctl</strong>'...
    <strong>Removing: </strong>/usr/local/Cellar/<strong>flyctl</strong>/0.3.39... (13 files, 62.9MB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong>flyctl</strong>_bottle_manifest--0.3.39... (7.2KB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong>flyctl</strong>--0.3.39... (20.9MB)
    ==> <strong>Upgrading </strong>git
      2.47.0 -> 2.47.1 
    ==> Pouring git--2.47.1.ventura.bottle.tar.gz
    ==> Caveats
    The Tcl/Tk GUIs (e.g. gitk, git-gui) are now in the 'git-gui' formula.
    Subversion interoperability (git-svn) is now in the 'git-svn' formula.
    zsh completions and functions have been installed to:
      /usr/local/share/zsh/site-functions
    ==> Summary
    /usr/local/Cellar/git/2.47.1: 1,685 files, 54.6MB
    ==> Running 'brew cleanup git'...
    <strong>Removing: </strong>/usr/local/Cellar/git/2.47.0... (1,684 files, 54.6MB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/git_bottle_manifest--2.47.0... (14.2KB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/git--2.47.0... (19.9MB)
    ==> Caveats
    ==> nginx
    Docroot is: /usr/local/var/www
    The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that
    nginx can run without sudo.
    nginx will load all files in /usr/local/etc/nginx/servers/.
    To start nginx now and restart at login:
      brew services start nginx
    Or, if you don't want/need a background service you can just run:
      /usr/local/opt/nginx/bin/nginx -g daemon\ off\;
    ==> <strong>smart.phonics</strong>@3.11
    <strong>smart.phonics</strong> is installed as
      /usr/local/bin/<strong>smart.phonics</strong>3.11
    Unversioned and major-versioned symlinks '<strong>smart.phonics</strong>', '<strong>smart.phonics</strong>3', '<strong>smart.phonics</strong>-config', '<strong>smart.phonics</strong>3-config', 'pip', 'pip3', etc. pointing to
    '<strong>smart.phonics</strong>3.11', '<strong>smart.phonics</strong>3.11-config', 'pip3.11' etc., respectively, are installed into
      /usr/local/opt/<strong>smart.phonics</strong>@3.11/libexec/bin
    You can <strong>install </strong><strong>smart.phonics</strong> packages with
      pip3.11 <strong>install </strong><package>
    They will <strong>install </strong>into the site-package directory
      /usr/local/lib/<strong>smart.phonics</strong>3.11/site-packages
    tkinter is no longer included with this formula, but it is available separately:
      brew <strong>install </strong><strong>smart.phonics</strong>-tk@3.11
    gdbm ('dbm.gnu') is no longer included in this formula, but it is available separately:
      brew <strong>install </strong><strong>smart.phonics</strong>-gdbm@3.11
    'dbm.ndbm' changed database backends in Homebrew <strong>smart.phonics</strong> 3.11.
    If you need to read a database from a previous Homebrew <strong>smart.phonics</strong> created via 'dbm.ndbm',
    you'll need to read your database using the older version of Homebrew <strong>smart.phonics</strong> and convert to another format.
    'dbm' still defaults to 'dbm.gnu' when it is installed.
    If you do not need a specific version of <strong>smart.phonics</strong>, and always want Homebrew's '<strong>smart.phonics</strong>3' in your PATH:
      brew <strong>install </strong><strong>smart.phonics</strong>3
    For more information about Homebrew and <strong>smart.phonics</strong>, see: https://docs.brew.sh/Homebrew-and-<strong>smart.phonics</strong>
    ==> <strong>flyctl</strong>
    zsh completions have been installed to:
      /usr/local/share/zsh/site-functions
    ==> git
    The Tcl/Tk GUIs (e.g. gitk, git-gui) are now in the 'git-gui' formula.
    Subversion interoperability (git-svn) is now in the 'git-svn' formula.
    zsh completions and functions have been installed to:
      /usr/local/share/zsh/site-functions
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>sqlite</strong>/manifests/3.47.1
    ==> <strong>Fetching </strong><strong>sqlite</strong>
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>sqlite</strong>/blobs/sha256:3ec83a8caed77476623d709d6d980698f09c0fb267907a2bf8323e6fc5b8439b
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong><strong>micro<strong>smart.phonics</strong></strong></strong>/manifests/1.24.1
    ==> <strong>Fetching </strong><strong><strong>micro<strong>smart.phonics</strong></strong></strong>
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong><strong>micro<strong>smart.phonics</strong></strong></strong>/blobs/sha256:6601736a89957321cdb26111f3d6da67575ee7a5324b1af791cf2370240b259b
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/ca-certificates/manifests/2024-11-26
    ==> <strong>Fetching </strong>ca-certificates
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/ca-certificates/blobs/sha256:7a3b5f75ca44d330e0f37432af09f58e37bfa873f25d340dece3c3e6c7927657
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/nginx/manifests/1.27.3-1
    ==> <strong>Fetching </strong>nginx
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/nginx/blobs/sha256:a522ff78dbf7156230cac0fe298d93fc7fc841650290722caf435513c15476be
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/node/manifests/23.3.0
    ==> <strong>Fetching </strong>node
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/node/blobs/sha256:28a491eda835e37fed1f69d12c5967d86c25d5e8aa43c4c5664c6f042d8f6fa7
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>smart.phonics</strong>/3.11/manifests/3.11.11
    ==> <strong>Fetching </strong><strong>smart.phonics</strong>@3.11
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>smart.phonics</strong>/3.11/blobs/sha256:ee9aaacdb633337b49e6294d76317bcbfbab475b6f220f2ee62e67353250c8a6
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>flyctl</strong>/manifests/0.3.46
    ==> <strong>Fetching </strong><strong>flyctl</strong>
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>flyctl</strong>/blobs/sha256:3b7de3da2e6243d4af5035bce6f93055e4883f2277ae7c8722c149f8c45f4b72
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/git/manifests/2.47.1
    ==> <strong>Fetching </strong>git
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/git/blobs/sha256:aaa8aee7e2147287d742c407139fad74126ef2d97fc13655657f9bd511b1c818
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>sqlite</strong>/manifests/3.47.1
    ==> <strong>Fetching </strong><strong>sqlite</strong>
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>sqlite</strong>/blobs/sha256:3ec83a8caed77476623d709d6d980698f09c0fb267907a2bf8323e6fc5b8439b
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong><strong>micro<strong>smart.phonics</strong></strong></strong>/manifests/1.24.1
    ==> <strong>Fetching </strong><strong><strong>micro<strong>smart.phonics</strong></strong></strong>
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong><strong>micro<strong>smart.phonics</strong></strong></strong>/blobs/sha256:6601736a89957321cdb26111f3d6da67575ee7a5324b1af791cf2370240b259b
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/ca-certificates/manifests/2024-11-26
    ==> <strong>Fetching </strong>ca-certificates
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/ca-certificates/blobs/sha256:7a3b5f75ca44d330e0f37432af09f58e37bfa873f25d340dece3c3e6c7927657
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/nginx/manifests/1.27.3-1
    ==> <strong>Fetching </strong>nginx
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/nginx/blobs/sha256:a522ff78dbf7156230cac0fe298d93fc7fc841650290722caf435513c15476be
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/node/manifests/23.3.0
    ==> <strong>Fetching </strong>node
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/node/blobs/sha256:28a491eda835e37fed1f69d12c5967d86c25d5e8aa43c4c5664c6f042d8f6fa7
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>smart.phonics</strong>/3.11/manifests/3.11.11
    ==> <strong>Fetching </strong><strong>smart.phonics</strong>@3.11
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>smart.phonics</strong>/3.11/blobs/sha256:ee9aaacdb633337b49e6294d76317bcbfbab475b6f220f2ee62e67353250c8a6
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>flyctl</strong>/manifests/0.3.46
    ==> <strong>Fetching </strong><strong>flyctl</strong>
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>flyctl</strong>/blobs/sha256:3b7de3da2e6243d4af5035bce6f93055e4883f2277ae7c8722c149f8c45f4b72
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/git/manifests/2.47.1
    ==> <strong>Fetching </strong>git
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/git/blobs/sha256:aaa8aee7e2147287d742c407139fad74126ef2d97fc13655657f9bd511b1c818
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>sqlite</strong>/manifests/3.47.1
    ==> <strong>Fetching </strong><strong>sqlite</strong>
    ==> Pouring ca-certificates--2024-11-26.all.bottle.tar.gz
    ==> Regenerating CA certificate bundle from keychain, this may take a while...
      /usr/local/Cellar/ca-certificates/2024-11-26: 4 files, 239.4KB
    ==> Running 'brew cleanup ca-certificates'...
    <strong>Removing: </strong>/usr/local/Cellar/ca-certificates/2024-09-24... (4 files, 237.4KB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/ca-certificates_bottle_manifest--2024-09-24... (1.9KB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/ca-certificates--2024-09-24... (132.6KB)
    ==> <strong>Upgrading </strong>nginx
      1.27.2 -> 1.27.3 
    ==> Pouring nginx--1.27.3.ventura.bottle.1.tar.gz
    ==> Caveats
    Docroot is: /usr/local/var/www
    The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that
    nginx can run without sudo.
    nginx will load all files in /usr/local/etc/nginx/servers/.
    To start nginx now and restart at login:
      brew services start nginx
    Or, if you don't want/need a background service you can just run:
      /usr/local/opt/nginx/bin/nginx -g daemon\ off\;
    ==> Summary
      /usr/local/Cellar/nginx/1.27.3: 27 files, 2.5MB
    ==> Running 'brew cleanup nginx'...
    <strong>Removing: </strong>/usr/local/Cellar/nginx/1.27.2... (27 files, 2.5MB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/nginx_bottle_manifest--1.27.2... (10KB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/nginx--1.27.2... (1.4MB)
    ==> <strong>Upgrading </strong>node
      23.2.0_1 -> 23.3.0 
    ==> Pouring node--23.3.0.ventura.bottle.tar.gz
    /usr/local/Cellar/node/23.3.0: 2,676 files, 88.2MB
    ==> Running 'brew cleanup node'...
    <strong>Removing: </strong>/usr/local/Cellar/node/23.2.0_1... (2,676 files, 88.2MB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/node_bottle_manifest--23.2.0_1... (16.2KB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/node--23.2.0_1... (21.1MB)
    ==> <strong>Upgrading </strong><strong>smart.phonics</strong>@3.11
      3.11.10 -> 3.11.11 
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>sqlite</strong>/blobs/sha256:3ec83a8caed77476623d709d6d980698f09c0fb267907a2bf8323e6fc5b8439b
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong><strong>micro<strong>smart.phonics</strong></strong></strong>/manifests/1.24.1
    ==> <strong>Fetching </strong><strong>micro<strong>smart.phonics</strong></strong>
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>micro<strong>smart.phonics</strong></strong>/blobs/sha256:6601736a89957321cdb26111f3d6da67575ee7a5324b1af791cf2370240b259b
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/ca-certificates/manifests/2024-11-26
    ==> <strong>Fetching </strong>ca-certificates
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/ca-certificates/blobs/sha256:7a3b5f75ca44d330e0f37432af09f58e37bfa873f25d340dece3c3e6c7927657
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/nginx/manifests/1.27.3-1
    ==> <strong>Fetching </strong>nginx
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/nginx/blobs/sha256:a522ff78dbf7156230cac0fe298d93fc7fc841650290722caf435513c15476be
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/node/manifests/23.3.0
    ==> <strong>Fetching </strong>node
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/node/blobs/sha256:28a491eda835e37fed1f69d12c5967d86c25d5e8aa43c4c5664c6f042d8f6fa7
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>smart.phonics</strong>/3.11/manifests/3.11.11
    ==> <strong>Fetching </strong><strong>smart.phonics</strong>@3.11
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>smart.phonics</strong>/3.11/blobs/sha256:ee9aaacdb633337b49e6294d76317bcbfbab475b6f220f2ee62e67353250c8a6
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>flyctl</strong>/manifests/0.3.46
    ==> <strong>Fetching </strong><strong>flyctl</strong>
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>flyctl</strong>/blobs/sha256:3b7de3da2e6243d4af5035bce6f93055e4883f2277ae7c8722c149f8c45f4b72
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/git/manifests/2.47.1
    ==> <strong>Fetching </strong>git
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/git/blobs/sha256:aaa8aee7e2147287d742c407139fad74126ef2d97fc13655657f9bd511b1c818
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>sqlite</strong>/manifests/3.47.1
    ==> <strong>Fetching </strong><strong>sqlite</strong>
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>sqlite</strong>/blobs/sha256:3ec83a8caed77476623d709d6d980698f09c0fb267907a2bf8323e6fc5b8439b
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>micro<strong>smart.phonics</strong></strong>/manifests/1.24.1
    ==> <strong>Fetching </strong><strong>micro<strong>smart.phonics</strong></strong>
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>micro<strong>smart.phonics</strong></strong>/blobs/sha256:6601736a89957321cdb26111f3d6da67575ee7a5324b1af791cf2370240b259b
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/ca-certificates/manifests/2024-11-26
    ==> <strong>Fetching </strong>ca-certificates
    <strong>smart.phonics</strong> is installed as
      /usr/local/bin/<strong>smart.phonics</strong>3.11
    Unversioned and major-versioned symlinks '<strong>smart.phonics</strong>', '<strong>smart.phonics</strong>3', '<strong>smart.phonics</strong>-config', '<strong>smart.phonics</strong>3-config', 'pip', 'pip3', etc. pointing to
    '<strong>smart.phonics</strong>3.11', '<strong>smart.phonics</strong>3.11-config', 'pip3.11' etc., respectively, are installed into
      /usr/local/opt/<strong>smart.phonics</strong>@3.11/libexec/bin
    You can <strong>install </strong><strong>smart.phonics</strong> packages with
      pip3.11 <strong>install </strong><package>
    They will <strong>install </strong>into the site-package directory
      /usr/local/lib/<strong>smart.phonics</strong>3.11/site-packages
    tkinter is no longer included with this formula, but it is available separately:
      brew <strong>install </strong><strong>smart.phonics</strong>-tk@3.11
    gdbm ('dbm.gnu') is no longer included in this formula, but it is available separately:
      brew <strong>install </strong><strong>smart.phonics</strong>-gdbm@3.11
    'dbm.ndbm' changed database backends in Homebrew <strong>smart.phonics</strong> 3.11.
    If you need to read a database from a previous Homebrew <strong>smart.phonics</strong> created via 'dbm.ndbm',
    you'll need to read your database using the older version of Homebrew <strong>smart.phonics</strong> and convert to another format.
    'dbm' still defaults to 'dbm.gnu' when it is installed.
    If you do not need a specific version of <strong>smart.phonics</strong>, and always want Homebrew's '<strong>smart.phonics</strong>3' in your PATH:
      brew <strong>install </strong><strong>smart.phonics</strong>3
    For more information about Homebrew and <strong>smart.phonics</strong>, see: https://docs.brew.sh/Homebrew-and-<strong>smart.phonics</strong>
    ==> <strong>flyctl</strong>
    zsh completions have been installed to:
      /usr/local/share/zsh/site-functions
    ==> <strong>git</strong>
    The Tcl/Tk GUIs (e.g. gitk, git-gui) are now in the 'git-gui' formula.
    Subversion interoperability (git-svn) is now in the 'git-svn' formula.
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/ca-certificates/blobs/sha256:7a3b5f75ca44d330e0f37432af09f58e37bfa873f25d340dece3c3e6c7927657
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/nginx/manifests/1.27.3-1
    ==> <strong>Fetching </strong>nginx
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/nginx/blobs/sha256:a522ff78dbf7156230cac0fe298d93fc7fc841650290722caf435513c15476be
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/node/manifests/23.3.0
    ==> <strong>Fetching </strong>node
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/node/blobs/sha256:28a491eda835e37fed1f69d12c5967d86c25d5e8aa43c4c5664c6f042d8f6fa7
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>smart.phonics</strong>/3.11/manifests/3.11.11
    ==> <strong>Fetching </strong><strong>smart.phonics</strong>@3.11
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>smart.phonics</strong>/3.11/blobs/sha256:ee9aaacdb633337b49e6294d76317bcbfbab475b6f220f2ee62e67353250c8a6
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>flyctl</strong>/manifests/0.3.46
    ==> <strong>Fetching </strong><strong>flyctl</strong>
    Docroot is: /usr/local/var/www
    The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that
    nginx can run without sudo.
    nginx will load all files in /usr/local/etc/nginx/servers/.
    To start nginx now and restart at login:
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>flyctl</strong>/blobs/sha256:3b7de3da2e6243d4af5035bce6f93055e4883f2277ae7c8722c149f8c45f4b72
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/git/manifests/2.47.1
    ==> <strong>Fetching </strong>git
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/git/blobs/sha256:aaa8aee7e2147287d742c407139fad74126ef2d97fc13655657f9bd511b1c818
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>sqlite</strong>/manifests/3.47.1
    ==> <strong>Fetching </strong><strong>sqlite</strong>
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>sqlite</strong>/blobs/sha256:3ec83a8caed77476623d709d6d980698f09c0fb267907a2bf8323e6fc5b8439b
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>micro<strong>smart.phonics</strong></strong>/manifests/1.24.1
    ==> <strong>Fetching </strong><strong>micro<strong>smart.phonics</strong></strong>
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>micro<strong>smart.phonics</strong></strong>/blobs/sha256:6601736a89957321cdb26111f3d6da67575ee7a5324b1af791cf2370240b259b
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/ca-certificates/manifests/2024-11-26
    ==> <strong>Fetching </strong>ca-certificates
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/ca-certificates/blobs/sha256:7a3b5f75ca44d330e0f37432af09f58e37bfa873f25d340dece3c3e6c7927657
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/nginx/manifests/1.27.3-1
      3.47.0 -> 3.47.1 
    ==> Pouring <strong>sqlite</strong>--3.47.1.ventura.bottle.tar.gz
      /usr/local/Cellar/<strong>sqlite</strong>/3.47.1: 12 files, 4.9MB
    ==> Running 'brew cleanup <strong>sqlite</strong>'...
    Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
    Hide these hints with HOMEBREW_NO_ENV_HINTS (see 'man brew').
    <strong>Removing: </strong>/usr/local/Cellar/<strong>sqlite</strong>/3.47.0... (12 files, 4.9MB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong>sqlite</strong>_bottle_manifest--3.47.0... (9.4KB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong>sqlite</strong>--3.47.0... (2.3MB)
    ==> <strong>Upgrading </strong><strong>micro<strong>smart.phonics</strong></strong>
      1.24.0 -> 1.24.1 
    ==> Pouring <strong>micro<strong>smart.phonics</strong></strong>--1.24.1.ventura.bottle.tar.gz
      /usr/local/Cellar/<strong>micro<strong>smart.phonics</strong></strong>/1.24.1: 7 files, 1MB
    ==> Running 'brew cleanup <strong>micro<strong>smart.phonics</strong></strong>'...
    <strong>Removing: </strong>/usr/local/Cellar/<strong>micro<strong>smart.phonics</strong></strong>/1.24.0... (7 files, 1MB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong>micro<strong>smart.phonics</strong></strong>_bottle_manifest--1.24.0... (9.5KB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong>micro<strong>smart.phonics</strong></strong>--1.24.0... (492.2KB)
    ==> <strong>Upgrading </strong>ca-certificates
      2024-09-24 -> 2024-11-26 
    ==> Pouring ca-certificates--2024-11-26.all.bottle.tar.gz
    ==> Regenerating CA certificate bundle from keychain, this may take a while...
      /usr/local/Cellar/ca-certificates/2024-11-26: 4 files, 239.4KB
    ==> Running 'brew cleanup ca-certificates'...
    <strong>Removing: </strong>/usr/local/Cellar/ca-certificates/2024-09-24... (4 files, 237.4KB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/ca-certificates_bottle_manifest--2024-09-24... (1.9KB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/ca-certificates--2024-09-24... (132.6KB)
    ==> <strong>Upgrading </strong>nginx
      1.27.2 -> 1.27.3 
    ==> Pouring nginx--1.27.3.ventura.bottle.1.tar.gz
    ==> Caveats
    Docroot is: /usr/local/var/www
    The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that
    nginx can run without sudo.
    nginx will load all files in /usr/local/etc/nginx/servers/.
    To start nginx now and restart at login:
      brew services start nginx
    Or, if you don't want/need a background service you can just run:
      /usr/local/opt/nginx/bin/nginx -g daemon\ off\;
    ==> Summary
      /usr/local/Cellar/nginx/1.27.3: 27 files, 2.5MB
    ==> Running 'brew cleanup nginx'...
    <strong>Removing: </strong>/usr/local/Cellar/nginx/1.27.2... (27 files, 2.5MB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/nginx_bottle_manifest--1.27.2... (10KB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/nginx--1.27.2... (1.4MB)
    ==> <strong>Upgrading </strong>node
      23.2.0_1 -> 23.3.0 
    ==> Pouring node--23.3.0.ventura.bottle.tar.gz
    /usr/local/Cellar/node/23.3.0: 2,676 files, 88.2MB
    ==> Running 'brew cleanup node'...
    <strong>Removing: </strong>/usr/local/Cellar/node/23.2.0_1... (2,676 files, 88.2MB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/node_bottle_manifest--23.2.0_1... (16.2KB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/node--23.2.0_1... (21.1MB)
    ==> <strong>Upgrading </strong><strong>smart.phonics</strong>@3.11
      3.11.10 -> 3.11.11 
    ==> Pouring <strong>smart.phonics</strong>@3.11--3.11.11.ventura.bottle.tar.gz
    ==> /usr/local/Cellar/<strong>smart.phonics</strong>@3.11/3.11.11/bin/<strong>smart.phonics</strong>3.11 -Im ensurepip
    ==> /usr/local/Cellar/<strong>smart.phonics</strong>@3.11/3.11.11/bin/<strong>smart.phonics</strong>3.11 -Im pip <strong>install </strong>-v --no-index --upgrade --isolated --target=/usr/local/lib/<strong>smart.phonics</strong>3.11/site-
    ==> Caveats
    <strong>smart.phonics</strong> is installed as
      /usr/local/bin/<strong>smart.phonics</strong>3.11
    Unversioned and major-versioned symlinks '<strong>smart.phonics</strong>', '<strong>smart.phonics</strong>3', '<strong>smart.phonics</strong>-config', '<strong>smart.phonics</strong>3-config', 'pip', 'pip3', etc. pointing to
    '<strong>smart.phonics</strong>3.11', '<strong>smart.phonics</strong>3.11-config', 'pip3.11' etc., respectively, are installed into
      /usr/local/opt/<strong>smart.phonics</strong>@3.11/libexec/bin
    You can <strong>install </strong><strong>smart.phonics</strong> packages with
      pip3.11 <strong>install </strong><package>
    They will <strong>install </strong>into the site-package directory
      /usr/local/lib/<strong>smart.phonics</strong>3.11/site-packages
    tkinter is no longer included with this formula, but it is available separately:
      brew <strong>install </strong><strong>smart.phonics</strong>-tk@3.11
    gdbm ('dbm.gnu') is no longer included in this formula, but it is available separately:
      brew <strong>install </strong><strong>smart.phonics</strong>-gdbm@3.11
    'dbm.ndbm' changed database backends in Homebrew <strong>smart.phonics</strong> 3.11.
    If you need to read a database from a previous Homebrew <strong>smart.phonics</strong> created via 'dbm.ndbm',
    you'll need to read your database using the older version of Homebrew <strong>smart.phonics</strong> and convert to another format.
    'dbm' still defaults to 'dbm.gnu' when it is installed.
    If you do not need a specific version of <strong>smart.phonics</strong>, and always want Homebrew's '<strong>smart.phonics</strong>3' in your PATH:
      brew <strong>install </strong><strong>smart.phonics</strong>3
    For more information about Homebrew and <strong>smart.phonics</strong>, see: https://docs.brew.sh/Homebrew-and-<strong>smart.phonics</strong>
    ==> Summary
    /usr/local/Cellar/<strong>smart.phonics</strong>@3.11/3.11.11: 3,304 files, 61.3MB
    ==> Running 'brew cleanup <strong>smart.phonics</strong>@3.11'...
    <strong>Removing: </strong>/usr/local/Cellar/<strong>smart.phonics</strong>@3.11/3.11.10... (3,304 files, 61.3MB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong>smart.phonics</strong>@3.11_bottle_manifest--3.11.10... (28.2KB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong>smart.phonics</strong>@3.11--3.11.10... (15MB)
    ==> <strong>Upgrading </strong><strong>flyctl</strong>
      0.3.39 -> 0.3.46 
    ==> Pouring <strong>flyctl</strong>--0.3.46.ventura.bottle.tar.gz
    ==> Caveats
    zsh completions have been installed to:
      /usr/local/share/zsh/site-functions
    ==> Summary
    /usr/local/Cellar/<strong>flyctl</strong>/0.3.46: 13 files, 62.7MB
    ==> Running 'brew cleanup <strong>flyctl</strong>'...
    <strong>Removing: </strong>/usr/local/Cellar/<strong>flyctl</strong>/0.3.39... (13 files, 62.9MB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong>flyctl</strong>_bottle_manifest--0.3.39... (7.2KB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong>flyctl</strong>--0.3.39... (20.9MB)
    ==> <strong>Upgrading </strong>git
      2.47.0 -> 2.47.1 
    ==> Pouring git--2.47.1.ventura.bottle.tar.gz
    ==> Caveats
    The Tcl/Tk GUIs (e.g. gitk, git-gui) are now in the 'git-gui' formula.
    Subversion interoperability (git-svn) is now in the 'git-svn' formula.
    zsh completions and functions have been installed to:
      /usr/local/share/zsh/site-functions
    ==> <strong>Fetching </strong>nginx
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/nginx/blobs/sha256:a522ff78dbf7156230cac0fe298d93fc7fc841650290722caf435513c15476be
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/node/manifests/23.3.0
    ==> <strong>Fetching </strong>node
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/node/blobs/sha256:28a491eda835e37fed1f69d12c5967d86c25d5e8aa43c4c5664c6f042d8f6fa7
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>smart.phonics</strong>/3.11/manifests/3.11.11
    ==> <strong>Fetching </strong><strong>smart.phonics</strong>@3.11
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>smart.phonics</strong>/3.11/blobs/sha256:ee9aaacdb633337b49e6294d76317bcbfbab475b6f220f2ee62e67353250c8a6
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>flyctl</strong>/manifests/0.3.46
    ==> <strong>Fetching </strong><strong>flyctl</strong>
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>flyctl</strong>/blobs/sha256:3b7de3da2e6243d4af5035bce6f93055e4883f2277ae7c8722c149f8c45f4b72
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/git/manifests/2.47.1
    ==> <strong>Fetching </strong>git
    ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/git/blobs/sha256:aaa8aee7e2147287d742c407139fad74126ef2d97fc13655657f9bd511b1c818
    ==> <strong>Upgrading </strong><strong>sqlite</strong>
    ==> Summary
    /usr/local/Cellar/git/2.47.1: 1,685 files, 54.6MB
    ==> Running 'brew cleanup git'...
    <strong>Removing: </strong>/usr/local/Cellar/git/2.47.0... (1,684 files, 54.6MB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/git_bottle_manifest--2.47.0... (14.2KB)
    <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/git--2.47.0... (19.9MB)
    ==> Caveats
    ==> nginx
    Docroot is: /usr/local/var/www
    The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that
    nginx can run without sudo.
    nginx will load all files in /usr/local/etc/nginx/servers/.
    To start nginx now and restart at login:
      brew services start nginx
    Or, if you don't want/need a background service you can just run:
      /usr/local/opt/nginx/bin/nginx -g daemon\ off\;
    ==> <strong>smart.phonics</strong>@3.11
    <strong>smart.phonics</strong> is installed as
      /usr/local/bin/<strong>smart.phonics</strong>3.11
    Unversioned and major-versioned symlinks '<strong>smart.phonics</strong>', '<strong>smart.phonics</strong>3', '<strong>smart.phonics</strong>-config', '<strong>smart.phonics</strong>3-config', 'pip', 'pip3', etc. pointing to
    '<strong>smart.phonics</strong>3.11', '<strong>smart.phonics</strong>3.11-config', 'pip3.11' etc., respectively, are installed into
      /usr/local/opt/<strong>smart.phonics</strong>@3.11/libexec/bin
    You can <strong>install </strong><strong>smart.phonics</strong> packages with
      pip3.11 <strong>install </strong><package>
    They will <strong>install </strong>into the site-package directory
      /usr/local/lib/<strong>smart.phonics</strong>3.11/site-packages
    tkinter is no longer included with this formula, but it is available separately:
      brew <strong>install </strong><strong>smart.phonics</strong>-tk@3.11
    gdbm ('dbm.gnu') is no longer included in this formula, but it is available separately:
      brew <strong>install </strong><strong>smart.phonics</strong>-gdbm@3.11
    'dbm.ndbm' changed database backends in Homebrew <strong>smart.phonics</strong> 3.11.
    If you need to read a database from a previous Homebrew <strong>smart.phonics</strong> created via 'dbm.ndbm',
    you'll need to read your database using the older version of Homebrew <strong>smart.phonics</strong> and convert to another format.
    'dbm' still defaults to 'dbm.gnu' when it is installed.
    If you do not need a specific version of <strong>smart.phonics</strong>, and always want Homebrew's '<strong>smart.phonics</strong>3' in your PATH:
      brew <strong>install </strong><strong>smart.phonics</strong>3
    For more information about Homebrew and <strong>smart.phonics</strong>, see: https://docs.brew.sh/Homebrew-and-<strong>smart.phonics</strong>
    ==> <strong>flyctl</strong>
    zsh completions have been installed to:
      /usr/local/share/zsh/site-functions
    ==> <strong>git</strong>
    The Tcl/Tk GUIs (e.g. gitk, git-gui) are now in the 'git-gui' formula.
    Subversion interoperability (git-svn) is now in the 'git-svn' formula.
    zsh completions and functions have been installed to:
    /usr/local/Cellar/git/2.47.1: 1,685 files, 54.6MB Subversion interoperability
    <br>
    <br>
    <strong>smart.phonics</strong>
    ⠀⠀⠀⠀⠀⠀⠀<strong>Nicolas CANOT</strong> - DJing
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀<strong>Romain AL.</strong> - VJing
    <br>
    <br>
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣶⣶⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⣤⣤⣄⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    <strong>⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⡿⠟⠋⠁⠀⠀⠀⠀⠀⠈⠉⠛⠦⣄⡀⠀⠀⠀⠀⠀⠀⠀</strong>
    <strong>⠀⠀⠀⠀⠀⠀⠀⠀⢠⡼⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⢦⣶⣶⣶⣦⣄⠀</strong>
    <strong>⠀⠀⠀⠀⠀⠀⠀⢠⡟⠀⠀⠀⠀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣿⣿⣿⣿⣦</strong>
    <strong>⠀⢀⣀⣀⡀⠀⠀⡿⠀⠀⢀⣴⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⡟</strong>
    <strong>⢀⣿⣿⣿⣿⣦⣄⡇⠈⠋⢸⣿⣿⣯⣼⠏⠀⠀⠀⠀⠀⢀⣰⣦⣄⠀⠀⠀⠀⢹⡿⠋⠀</strong>
    <strong>⠈⣿⣿⣿⣿⣿⣿⣿⠀⠀⢀⣙⠛⠛⠁⠀⠀⣦⣤⡀⠀⣾⡟⣿⣿⣷⠀⠀⠀⢸⠂⠀⠀</strong>
    <strong>⠀⠹⣿⣿⣿⣿⣿⣿⣧⡀⠉⠁⠀⠀⠀⠻⣤⣿⣉⣩⠀⠹⣷⣿⣿⡿⠀⠀⠀⣼⠀⠀⠀</strong>
    <strong>⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣶⣄⡀⠀⠀⠀⠀⠈⠉⠁⠀⠀⢨⡉⠉⠀⢸⠀⣼⠃⠀⠀⠀</strong>
    <strong>⠀⠀⠀⠈⢻⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣄⣀⠀⠀⠀⠀⠀⠀⠑⠆⠀⣠⡾⠁⠀⠀⠀⠀</strong>
    <strong>⠀⠀⠀⠀⠀⠙⡟⠛⠻⠿⠿⠿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣶⣶⣶⣿⣏⠁⠀⠀⠀⠀⠀⠀</strong>
    ⠀⠀⠀⠀⠀⢰⠃⠀⠀⠀⠀⠀⠀⠀⠉⠛⠛⠿⢿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⢹⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⢸⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⠇⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠈⣿⣿⣷⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⣿⣿⠈⠙⠛⠉⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⡗⠒⠶⠤⠤⣶⣶⣿⣿⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠙⠿⠿⠿⠃⠀⠀⠀⠀⠀⠀⠙⠿⠿⠟⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    <br>
    <br>
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀<strong>Disable this behaviour</strong>
    ⠀⠀⠀⠀⠀⠀⠀Subversion interoperability`.split(/\r?\n|\r|\n/g),
  }))
);
